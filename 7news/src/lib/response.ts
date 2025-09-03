import { NextResponse } from "next/server";

export function ok(data: unknown, init: number = 200) {
  return NextResponse.json({ success: true, data }, { status: init });
}
export function created(data: unknown) {
  return NextResponse.json({ success: true, data }, { status: 201 });
}
export function badRequest(message = "Bad request") {
  return NextResponse.json({ success: false, message }, { status: 400 });
}
export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ success: false, message }, { status: 401 });
}
export function forbidden(message = "Forbidden") {
  return NextResponse.json({ success: false, message }, { status: 403 });
}
export function notFound(message = "Not found") {
  return NextResponse.json({ success: false, message }, { status: 404 });
}
export function error500(message = "Internal server error") {
  return NextResponse.json({ success: false, message }, { status: 500 });
}
