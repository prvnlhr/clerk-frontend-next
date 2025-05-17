const coverImageUrl = "/banners/apple.png";
const companyLogo = "/apple_logo.png";

export interface EditJob {
  id: string;
  title: string;
  company: string;
  coverImageUrl: string;
  logo: string;
  location: string;
  type: "full-time" | "contract" | "temporary" | "internship" | "part-time";
  workType: "onsite" | "remote" | "hybrid" | "flexible";
  salaryType: "notDisclosed" | "fixedAmount" | "range";
  yoe: string;
  salary?: string;
  salaryRange?: string;
  posted: string;
  applications: number;
  skills: string[];
  description: string;
}

export const editJobData: EditJob = {
  id: "JOB_1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
  title: "Mobile Application Developer (iOS), App Store",
  company: "Apple",
  coverImageUrl: coverImageUrl,
  logo: companyLogo,
  location: "Cupertino, California",
  type: "part-time",
  workType: "remote",
  yoe: "3",
  salaryType: "fixedAmount",
  salary: "35LPA",
  posted: "3 days ago",
  applications: 120,
  skills: [
    "Swift",
    "UIKit",
    "Core Data",
    "SwiftUI",
    "Combine",
    "Core Animation",
    "XCTest",
    "App Store Connect",
  ],
  description: `
      <h2>Mobile Application Developer (iOS), App Store</h2>
      <p><strong>Location:</strong> Cupertino, CA / Remote</p>

      <h3>About the Role</h3>
      <p>
        Join the team that helps shape the future of the App Store — the world’s most vibrant and innovative software marketplace.
        As an iOS Developer on the App Store team, you will play a key role in building high-quality, user-focused experiences that millions of people rely on daily.
        Your work will have a direct impact on how developers and users interact with the App Store ecosystem.
      </p>

      <h3>Key Responsibilities</h3>
      <ul>
        <li>Design, build, and maintain advanced iOS applications for the App Store.</li>
        <li>Collaborate with cross-functional teams including Product, Design, and QA to define, design, and ship new features.</li>
        <li>Ensure performance, quality, and responsiveness of applications.</li>
        <li>Identify and correct bottlenecks and fix bugs.</li>
        <li>Continuously discover, evaluate, and implement new technologies to maximize development efficiency.</li>
      </ul>

      <h3>Requirements</h3>
      <ul>
        <li>Proven experience building and maintaining iOS apps using Swift and UIKit.</li>
        <li>Strong understanding of Apple's design principles and interface guidelines.</li>
        <li>Experience with RESTful APIs, performance tuning, and modern iOS libraries.</li>
        <li>Familiarity with version control systems (e.g., Git).</li>
        <li>Strong problem-solving skills and attention to detail.</li>
      </ul>

      <h3>Preferred Qualifications</h3>
      <ul>
        <li>Experience with SwiftUI and Combine.</li>
        <li>Knowledge of the App Store submission process and guidelines.</li>
        <li>Background in consumer-facing or large-scale mobile applications.</li>
      </ul>

      <h3>Why Apple</h3>
      <p>
        At Apple, we work every day to create products that enrich people’s lives. Join us, and you’ll be a part of a collaborative culture where great ideas thrive.
        Your contributions will help build technologies that impact millions of users around the globe.
      </p>
    `,
};
