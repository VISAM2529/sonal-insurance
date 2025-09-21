import connectDB from '@/lib/db';
import LoanApplication from '@/models/LoanApplication';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    const skip = (page - 1) * limit;
    
    const applications = await LoanApplication.find(query)
      .populate('loanProductId', 'title interestRate.display')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await LoanApplication.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        applications,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}