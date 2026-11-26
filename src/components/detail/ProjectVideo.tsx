import styles from './ProjectVideo.module.css';

const YOUTUBE_ID = /(?:youtu\.be\/|[?&]v=|\/(?:embed|shorts)\/)([\w-]{11})/;

interface Props {
  url: string;
  title: string;
}

export function ProjectVideo({ url, title }: Props) {
  const id = url.match(YOUTUBE_ID)?.[1];
  if (!id) return null;

  return (
    <div className={styles.frame}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={`${title} 시연 영상`}
        className={styles.iframe}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
