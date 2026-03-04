/**
 * Google Drive 공유 URL을 직접 이미지 URL로 변환
 * https://drive.google.com/file/d/FILE_ID/view... → https://lh3.googleusercontent.com/d/FILE_ID
 */
export function convertImageUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/?]+)/);
  if (match) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
}
