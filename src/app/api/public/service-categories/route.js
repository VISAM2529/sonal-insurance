import connectDB from '@/lib/db';
import ServiceCategory from '@/models/ServiceCategory';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    
    const categories = await ServiceCategory.find({ isActive: true })
      .sort({ displayOrder: 1, name: 1 });

    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}