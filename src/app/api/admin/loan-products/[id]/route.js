import connectDB from '@/lib/db';
import LoanProduct from '@/models/LoanProduct';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const product = await LoanProduct.findById(params.id)
      .populate('categoryId', 'name slug icon color bgColor iconBg');

    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Loan product not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();
    const product = await LoanProduct.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).populate('categoryId', 'name slug icon color bgColor iconBg');

    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Loan product not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const product = await LoanProduct.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Loan product not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Loan product deleted successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
