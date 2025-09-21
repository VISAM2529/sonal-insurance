import connectDB from '@/lib/db';
import ServiceCategory from '@/models/ServiceCategory';
import { NextResponse } from 'next/server';
import Service from '@/models/Service';
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();
    const category = await ServiceCategory.findByIdAndUpdate(
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

    // Check if category is being used by any services
    const servicesCount = await Service.countDocuments({ categoryId: params.id });

    if (servicesCount > 0) {
      return NextResponse.json({
        success: false,
        error: `Cannot delete category. ${servicesCount} services are using this category.`
      }, { status: 400 });
    }

    const category = await ServiceCategory.findOneAndDelete({ _id: params.id });

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
  }
}

