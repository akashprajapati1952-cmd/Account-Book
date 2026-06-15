import React from "react";
import {
  Mail,
  Phone,
  BookOpen,
  Compass,
  Code2,
  GraduationCap,
  FolderKanban,
} from "lucide-react";

function AboutPage() {
  const skills = [
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Redux Toolkit",
    "Formik",
    "Yup",
    "REST API",
    "Git",
    "GitHub",
    "Responsive Design",
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero Section */}
        <section className="text-center">
          <div
            className="
              mx-auto
              mb-5

              flex
              h-28
              w-28
              items-center
              justify-center

              rounded-full

              bg-indigo-100

              text-4xl
              font-bold

              text-indigo-700
            "
          >
            AP
          </div>

          <h1 className="text-4xl font-bold text-slate-800">
            Akash Prajapati
          </h1>

          <p className="mt-2 text-lg text-slate-500">
            Frontend Developer
          </p>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl

              text-slate-600
              leading-7
            "
          >
            Passionate frontend developer focused on building
            responsive, modern and user-friendly web
            applications using React, TypeScript, Redux Toolkit
            and Tailwind CSS.
          </p>
        </section>

        {/* Basic Info */}
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <InfoCard
            emoji="📍"
            title="Location"
            value="Unnao, Uttar Pradesh"
          />

          <InfoCard
            emoji="🎓"
            title="College"
            value="Somdev Mahavidyalaya"
          />

          <InfoCard
            emoji="💻"
            title="Specialization"
            value="Frontend Development"
          />

          <InfoCard
            emoji="🚀"
            title="Focus"
            value="React & Modern UI"
          />
        </section>

        {/* Skills */}
        <Section
          icon={<Code2 size={18} />}
          title="Frontend Skills"
        >
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="
                  rounded-full

                  bg-indigo-100

                  px-3
                  py-1

                  text-sm
                  font-medium

                  text-indigo-700
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        {/* Journey */}
        <Section
          icon={<BookOpen size={18} />}
          title="Frontend Journey"
        >
          Started learning web development in 2025 through
          CodeYogi. Since then, I have built multiple projects
          using React, Redux Toolkit, TypeScript and Tailwind
          CSS while focusing on responsive design and clean
          user experience.
        </Section>

        {/* Education */}
        <Section
          icon={<GraduationCap size={18} />}
          title="Education"
        >
          Pursuing graduation from Somdev Mahavidyalaya while
          continuously improving frontend development skills
          through self-learning, project building and practical
          implementation.
        </Section>

        {/* Projects */}
        <Section
          icon={<FolderKanban size={18} />}
          title="Projects"
        >
          <ul className="space-y-3">
            <li>
              <strong>Account Book</strong> — Business
              transaction management application built using
              React, Redux Toolkit, TypeScript and Firebase.
            </li>

            <li>
              <strong>Portfolio Website</strong> — Personal
              portfolio showcasing projects, skills and frontend
              development journey.
            </li>

            <li>
              <strong>Customer Management System</strong> —
              CRUD-based application with responsive UI and
              state management.
            </li>
          </ul>
        </Section>

        {/* Passion */}
        <Section
          icon={<Compass size={18} />}
          title="Passion"
        >
          Passionate about building responsive, accessible and
          user-friendly web applications with modern frontend
          technologies and continuously improving UI/UX
          development skills.
        </Section>

        {/* Contact */}
        <section
          className="
            mt-8

            rounded-3xl

            border
            border-slate-200

            bg-white

            p-6

            shadow-sm
          "
        >
          <h2 className="mb-4 text-xl font-bold text-slate-800">
            Contact
          </h2>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:akashprajapati1952@gmail.com"
              className="
                flex
                items-center
                gap-3

                text-blue-600

                hover:underline
              "
            >
              <Mail size={18} />
              akashprajapati1952@gmail.com
            </a>

            <a
              href="tel:9651073396"
              className="
                flex
                items-center
                gap-3

                text-green-600

                hover:underline
              "
            >
              <Phone size={18} />
              9651073396
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  emoji,
  title,
  value,
}: {
  emoji: string;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl

        border
        border-slate-200

        bg-white

        p-5

        shadow-sm
      "
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl">{emoji}</span>

        <div>
          <p className="text-xs text-slate-500">
            {title}
          </p>

          <p className="font-semibold text-slate-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        mt-8

        rounded-3xl

        border
        border-slate-200

        bg-white

        p-6

        shadow-sm
      "
    >
      <div
        className="
          mb-4

          flex
          items-center
          gap-2

          text-lg
          font-bold

          text-slate-800
        "
      >
        {icon}
        {title}
      </div>

      <div className="leading-7 text-slate-600">
        {children}
      </div>
    </section>
  );
}

export default AboutPage;