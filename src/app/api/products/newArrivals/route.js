// server/api/products/newArrivals.js
import prisma from '../../../util/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const newArrivals = await prisma.$queryRaw`
      SELECT p.*, i.*
      FROM Product p
      LEFT JOIN Image i ON i.productId = p.id
      WHERE p.status = 'active'
      ORDER BY p.createdAt DESC
      LIMIT 10;
    `;

    return NextResponse.json({ data: newArrivals, status: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch new arrivals', error: error.message, status: false }, { status: 500 });
  }
}
