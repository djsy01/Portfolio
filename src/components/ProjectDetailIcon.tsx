import Image from "next/image";
import styles from "./ProjectDetailIcon.module.css";

interface ProjectDetailIconProps {
  icon: string;
  iconImage?: string;
}

export function ProjectDetailIcon({ icon, iconImage }: ProjectDetailIconProps) {
  return (
    <div className={styles.icon} aria-hidden="true">
      {iconImage ? <Image src={iconImage} alt="" width={64} height={64} /> : icon}
    </div>
  );
}
