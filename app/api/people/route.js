import { NextResponse } from "next/server";
import { PeoplesData } from "../../../Peoples";
export async function GET(request) {
    // console.log(PeoplesData, request)
    return NextResponse.json(
        { peoples: PeoplesData }, { status: 200 }
    );
};