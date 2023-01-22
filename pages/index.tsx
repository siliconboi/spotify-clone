import Head from "next/head";
import Image from "next/image";
import { GradientLayout } from "../components/gradientLayout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <GradientLayout
      color="red"
      title="Aishwary Tripathi"
      subtitle="profile"
      description="60k followers"
      image="./user.png"
      isRounded="true"
    >
      <div>hello</div>
    </GradientLayout>
  );
}
