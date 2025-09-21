import connectDB from '@/lib/db';
import LoanCategory from '@/models/LoanCategory';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    
    const categories = await LoanCategory.find({ isActive: true })
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

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const category = new LoanCategory(body);
    await category.save();

    return NextResponse.json({
      success: true,
      data: category
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}
