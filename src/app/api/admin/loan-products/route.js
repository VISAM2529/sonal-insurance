import connectDB from '@/lib/db';
import LoanProduct from '@/models/LoanProduct';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const featured = searchParams.get('featured');
    
    let query = { isActive: true };
    
    if (categoryId) {
      query.categoryId = categoryId;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    const products = await LoanProduct.find(query)
      .populate('categoryId', 'name slug icon color bgColor iconBg')
      .sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products
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
    const product = new LoanProduct(body);
    await product.save();
    
    await product.populate('categoryId', 'name slug icon color bgColor iconBg');

    return NextResponse.json({
      success: true,
      data: product
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}
