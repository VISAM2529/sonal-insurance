import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { principal, rate, tenure } = await request.json();
    
    // Validate inputs
    if (!principal || !rate || !tenure) {
      return NextResponse.json({
        success: false,
        error: 'Principal, rate, and tenure are required'
      }, { status: 400 });
    }
    
    // EMI calculation
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100; // monthly rate
    const n = parseFloat(tenure) * 12; // months
    
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;
    
    return NextResponse.json({
      success: true,
      data: {
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principal: P,
        rate: parseFloat(rate),
        tenure: parseFloat(tenure)
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}