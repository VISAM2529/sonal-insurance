import connectDB from '@/lib/db';
import Service from '@/models/Service';
import ServicePlan from '@/models/ServicePlan';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    console.log("Params:", params.slug);
    const service = await Service.findOne({ 
      categoryId: params.slug, // Assuming slug is actually ID, or you can find by slug
      isActive: true 
    }).populate('categoryId', 'name slug icon color bgGradient');

    if (!service) {
      return NextResponse.json({
        success: false,
        error: 'Service not found'
      }, { status: 404 });
    }

    // Get plans for this service
    const plans = await ServicePlan.find({ 
      serviceId: service._id, 
      isActive: true 
    }).sort({ displayOrder: 1 });

    return NextResponse.json({
      success: true,
      data: {
        service,
        plans
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}