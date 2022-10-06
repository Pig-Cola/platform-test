import { NextResponse } from 'next/server'
import type { NextMiddleware } from 'next/server'

export const middleware: NextMiddleware = async function ( req, event ) {
  const path = req.nextUrl.pathname
  // console.log(path)
  const newPath = req.nextUrl.clone()

  // // 루트 접속시 해당 페이지로 리다이렉트
  if ( req.nextUrl.basePath === '' && path === '/' ) {
    newPath.basePath = '/gpst-smc'
    return NextResponse.redirect( newPath )
  }

  return
}
