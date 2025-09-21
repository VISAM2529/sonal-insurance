import connectDB from '@/lib/db';
import LoanStats from '@/models/LoanStats';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '6months';
    
    let startDate = new Date();
    let monthsBack = 6;
    
    if (period === '1year') {
      monthsBack = 12;
    } else if (period === 'all') {
      monthsBack = 24;
    }
    
    startDate.setMonth(startDate.getMonth() - monthsBack);
    const startMonth = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;
    
    const stats = await LoanStats.find({
      month: { $gte: startMonth }
    })
    .populate('categoryWiseStats.categoryId', 'name')
    .sort({ month: 1 });

    // Calculate summary stats
    const summary = stats.reduce((acc, stat) => {
      acc.totalApplications += stat.totalApplications;
      acc.approvedApplications += stat.approvedApplications;
      acc.disbursedAmount += stat.disbursedAmount;
      acc.approvedAmount += stat.approvedAmount;
      return acc;
    }, {
      totalApplications: 0,
      approvedApplications: 0,
      disbursedAmount: 0,
      approvedAmount: 0
    });

    // Calculate approval rate
    summary.approvalRate = summary.totalApplications > 0 
      ? ((summary.approvedApplications / summary.totalApplications) * 100).toFixed(1)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        stats,
        summary
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Check if stats for this month already exist
    const existingStats = await LoanStats.findOne({
      month: body.month,
      year: body.year
    });
    
    if (existingStats) {
      // Update existing stats
      const updatedStats = await LoanStats.findByIdAndUpdate(
        existingStats._id,
        body,
        { new: true, runValidators: true }
      ).populate('categoryWiseStats.categoryId', 'name slug');
      
      return NextResponse.json({
        success: true,
        data: updatedStats,
        message: 'Loan stats updated successfully'
      });
    } else {
      // Create new stats
      const stats = new LoanStats(body);
      await stats.save();
      
      await stats.populate('categoryWiseStats.categoryId', 'name slug');
      
      return NextResponse.json({
        success: true,
        data: stats,
        message: 'Loan stats created successfully'
      }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}
