import connectDB from '@/lib/db';
import ServicePlan from '@/models/ServicePlan';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');
    
    const query = serviceId ? { serviceId, isActive: true } : { isActive: true };
    const plans = await ServicePlan.find(query)
      .populate('serviceId', 'title')
      .sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: plans
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
    const plan = new ServicePlan(body);
    await plan.save();
    
    await plan.populate('serviceId', 'title');

    return NextResponse.json({
      success: true,
      data: plan
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}
