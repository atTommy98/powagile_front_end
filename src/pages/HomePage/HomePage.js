import React from "react";

import Features4 from "../../components/features/Features4";
import Team2 from "../../components/team/Team2";
import Gallery2 from "../../components/gallery/Gallery2";
import Footer3 from "../../components/footers/Footer3";
import StatsGraph from "../../components/StatsGraph/StatsGraph"

export default function Index(props) {

  return (
    <React.Fragment>
      <Features4
        content={{
          header: "There's no I in PowerShell Rangers",
          "col1-header": "Stay Organised",
          "col1-desc":
            "Rough night of drinking last night? Don't want to plan your stand-ups and retros? No problem. Just log in, open up your agile ritual of choice and you're good to go!",
          "col2-header": "Improve Your Team",
          "col2-desc":
            "Engagement data ready to view instantly. Find out who's been watching TikToks instead of attending your morning stand-ups.",
          "col3-header": "Make It Fun",
          "col3-desc":
            "With gamification at the heart of our work, we hope your team will have more fun using our app, keeping engagement levels high!",
          "col4-header": "Remote Access",
          "col4-desc":
            "Designed around a remote world, never fear that your team members are unable to contribute. It will feel like your async team members are right there with you.",
        }}
      />

      <Team2
        content={{
          "01_image":
            "https://ca.slack-edge.com/T6L933W4X-U01ABL9U2QZ-cf9a17f073c1-512",
          "01_name": "Tommy Holt",
          "01_job": "Dev",
          "02_image":
            "https://ca.slack-edge.com/T6L933W4X-U01A16393UK-e3bc61203f3b-512",
          "02_name": "Daniela Leva",
          "02_job": "Also a Dev",
          "03_image":
            "https://ca.slack-edge.com/T6L933W4X-U019V870Z4M-gf4edd840c04-512",
          "03_name": "Stefan Kudev",
          "03_job": "Dev #3",
          "04_image":
            "https://ca.slack-edge.com/T6L933W4X-U01A5FT1UDA-77bc2aa61ade-512",
          "04_name": "Kawalpreet Kaur",
          "04_job": "DEV",
          "05_image": "/images/jon.png",
          "05_name": "Jon Owens",
          "05_job": "Devdevdev",
        }}
      />

      <Gallery2 content={null} />

      <Footer3 content={null} />
      <StatsGraph></StatsGraph>
    </React.Fragment>
  );
}
