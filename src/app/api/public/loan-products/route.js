import connectDB from '@/lib/db';
import LoanProduct from '@/models/LoanProduct';
import LoanCategory from '@/models/LoanCategory';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    let query = { isActive: true };
    
    if (category) {
      const categoryDoc = await LoanCategory.findOne({ slug: category });
      if (categoryDoc) {
        query.categoryId = categoryDoc._id;
      }
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    const products = await LoanProduct.find(query)
      .populate('categoryId', 'name slug icon color bgColor iconBg')
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-faqs -documents -processSteps'); // Exclude heavy fields

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