/**
 * Google 이미지 URL을 직접 접근 가능한 URL로 변환
 * drive.google.com/file/d/FILE_ID/view → lh3.googleusercontent.com/d/FILE_ID
 * lh3.google.com/u/0/d/FILE_ID=... → lh3.googleusercontent.com/d/FILE_ID
 */
export function convertImageUrl(url: string): string {
  // drive.google.com/file/d/FILE_ID
  const driveMatch = url.match(/\/file\/d\/([^/?]+)/);
  if (driveMatch) return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;

  // lh3.google.com/u/.../d/FILE_ID=...
  const lh3Match = url.match(/lh3\.google\.com\/.*\/d\/([^=?]+)/);
  if (lh3Match) return `https://lh3.googleusercontent.com/d/${lh3Match[1]}`;

  return url;
}
