'use server';

import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import { SuperUser } from "@/db/models/superUserModel";

export const GET = withDB(async (req, res, db) => {
  try {
    const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
    const limit = 300;
    const skip = (page - 1) * limit;

    const currUser = JSON.parse(req.headers.get("user"));
    if (!currUser || currUser.role !== "superuser") {
      return NextResponse.json({ message: "Unauthorized for this data." }, { status: 403 });
    }

    const superusers = await SuperUser.find({
        _id: { $ne: currUser._id }
    }, "-password")
    .sort({ name: 1 })
    .skip(skip)
    .limit(limit);

    const totalDocuments = await SuperUser.countDocuments({
        _id: { $ne: currUser._id }
    });

    return NextResponse.json({ 
        message: "Super users fetched successfully.",
        data: superusers,
        pagination: {
            totalPages: Math.ceil(totalDocuments / limit),
            currentPage: page,
        } 
    }, {
        status: 200
    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching super users." }, { status: 500 });
  }
});