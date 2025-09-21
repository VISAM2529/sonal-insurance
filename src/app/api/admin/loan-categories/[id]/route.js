import connectDB from '@/lib/db';
import LoanCategory from '@/models/LoanCategory';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();
    const category = await LoanCategory.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return NextResponse.json({
        success: false,
        error: 'Category not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: category
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
    
    // Check if category is being used by any loan products
    const LoanProduct = require('@/models/LoanProduct');
    const productsCount = await LoanProduct.countDocuments({ categoryId: params.id });
    
    if (productsCount > 0) {
      return NextResponse.json({
        success: false,
        error: `Cannot delete category. ${productsCount} loan products are using this category.`
      }, { status: 400 });
    }

    const category = await LoanCategory.findByIdAndDelete(params.id);

    if (!category) {
      return NextResponse.json({
        success: false,
        error: 'Category not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }}