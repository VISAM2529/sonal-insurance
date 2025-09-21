import connectDB from '@/lib/db';
import Service from '@/models/Service';
import ServiceCategory from '@/models/ServiceCategory';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    
    const services = await Service.find()
      .populate('categoryId', 'name slug icon color')
      .sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: services
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
    const service = new Service(body);
    await service.save();
    
    await service.populate('categoryId', 'name slug icon color');

    return NextResponse.json({
      success: true,
      data: service
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}