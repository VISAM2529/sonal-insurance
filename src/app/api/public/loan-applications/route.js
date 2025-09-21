import connectDB from '@/lib/db';
import LoanApplication from '@/models/LoanApplication';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const application = new LoanApplication(body);
    await application.save();
    
    await application.populate('loanProductId', 'title');

    return NextResponse.json({
      success: true,
      data: application,
      message: 'Loan application submitted successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
}
