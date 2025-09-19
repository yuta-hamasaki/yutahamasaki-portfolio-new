export type Language = "en" | "de" | "ja"

export interface Translations {
  // Navigation
  nav: {
    home: string
    work: string
    about: string
    tech: string
    contact: string
  }
  // Hero Section
  hero: {
    title: string
    subtitle: string
    viewWork: string
    getInTouch: string
    scrollToExplore: string
  }
  // Work Section
  work: {
    title: string
    subtitle: string
    featured: string
    viewLive: string
    viewSource: string
  }
  // About Section
  about: {
    title: string
    subtitle: string
    myJourney: string
    education: string
    experience: string
    basedIn: string
  }
  // Tech Stack Section
  tech: {
    title: string
    subtitle: string
    additionalSkills: string
    frontend: string
    styling: string
    tools: string
    backend: string
  }
  // Contact Section
  contact: {
    title: string
    subtitle: string
    name: string
    email: string
    message: string
    send: string
    sending: string
    success: string
    error: string
  }
  // Common
  common: {
    loading: string
    error: string
    retry: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      work: "Work",
      about: "About",
      tech: "Tech Stack",
      contact: "Contact",
    },
    hero: {
      title: "Frontend Engineer & Creative Designer",
      subtitle:
        "I craft exceptional digital experiences through innovative frontend development and thoughtful design. Passionate about creating user-centered solutions that make a difference.",
      viewWork: "View My Work",
      getInTouch: "Get In Touch",
      scrollToExplore: "Scroll to explore",
    },
    work: {
      title: "Featured Projects",
      subtitle:
        "A showcase of my recent work in frontend development and design, featuring modern web applications built with cutting-edge technologies.",
      featured: "Featured",
      viewLive: "View live project",
      viewSource: "View source code",
    },
    about: {
      title: "About Me",
      subtitle: "Passionate about creating exceptional digital experiences through innovative design and clean code.",
      myJourney: "My Journey",
      education: "Education",
      experience: "Experience",
      basedIn: "Based in",
    },
    tech: {
      title: "Tech Stack",
      subtitle:
        "Technologies and tools I use to bring ideas to life, constantly learning and adapting to new innovations.",
      additionalSkills: "Additional Skills",
      frontend: "Frontend",
      styling: "Styling",
      tools: "Tools & Others",
      backend: "Backend & Database",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Have a project in mind or want to collaborate? I'd love to hear from you.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
    },
    common: {
      loading: "Loading...",
      error: "Something went wrong",
      retry: "Retry",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      work: "Arbeit",
      about: "Über mich",
      tech: "Technologien",
      contact: "Kontakt",
    },
    hero: {
      title: "Frontend-Ingenieur",
      subtitle:
        "Ich schaffe außergewöhnliche digitale Erlebnisse durch innovative Frontend-Entwicklung und durchdachtes Design. Leidenschaftlich für die Schaffung benutzerzentrierter Lösungen, die einen Unterschied machen.",
      viewWork: "Meine Arbeit Ansehen",
      getInTouch: "Kontakt Aufnehmen",
      scrollToExplore: "Scrollen zum Erkunden",
    },
    work: {
      title: "Ausgewählte Projekte",
      subtitle:
        "Eine Präsentation meiner neuesten Arbeit in Frontend-Entwicklung und Design, mit modernen Webanwendungen, die mit modernsten Technologien erstellt wurden.",
      featured: "Ausgewählt",
      viewLive: "Live-Projekt ansehen",
      viewSource: "Quellcode ansehen",
    },
    about: {
      title: "Über Mich",
      subtitle:
        "Leidenschaftlich für die Schaffung außergewöhnlicher digitaler Erlebnisse durch innovatives Design und sauberen Code.",
      myJourney: "Meine Reise",
      education: "Bildung",
      experience: "Erfahrung",
      basedIn: "Ansässig in",
    },
    tech: {
      title: "Tech-Stack",
      subtitle:
        "Technologien und Tools, die ich verwende, um Ideen zum Leben zu erwecken, ständig lernend und mich an neue Innovationen anpassend.",
      additionalSkills: "Zusätzliche Fähigkeiten",
      frontend: "Frontend",
      styling: "Styling",
      tools: "Tools und Andere",
      backend: "Backend und Datenbank",
    },
    contact: {
      title: "Kontakt Aufnehmen",
      subtitle: "Haben Sie ein Projekt im Kopf oder möchten zusammenarbeiten? Ich würde gerne von Ihnen hören.",
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
      send: "Nachricht Senden",
      sending: "Wird gesendet...",
      success: "Nachricht erfolgreich gesendet!",
      error: "Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.",
    },
    common: {
      loading: "Wird geladen...",
      error: "Etwas ist schief gelaufen",
      retry: "Wiederholen",
    },
  },
  ja: {
    nav: {
      home: "ホーム",
      work: "成果物",
      about: "私について",
      tech: "技術スタック",
      contact: "お問い合わせ",
    },
    hero: {
      title: "フロントエンドエンジニア＆クリエイティブデザイナー",
      subtitle:
        "革新的なフロントエンド開発と思慮深いデザインを通じて、卓越したデジタル体験を創造します。違いを生み出すユーザー中心のソリューション作りに情熱を注いでいます。",
      viewWork: "成果物を見る",
      getInTouch: "お問い合わせ",
      scrollToExplore: "Scroll to explore",
    },
    work: {
      title: "注目プロジェクト",
      subtitle:
        "最先端技術で構築された現代的なWebアプリケーションを特徴とする、フロントエンド開発とデザインにおける私の最近の作品のショーケース。",
      featured: "注目",
      viewLive: "ライブプロジェクトを見る",
      viewSource: "ソースコードを見る",
    },
    about: {
      title: "私について",
      subtitle: "革新的なデザインとクリーンなコードを通じて卓越したデジタル体験を創造することに情熱を注いでいます。",
      myJourney: "私の歩み",
      education: "Education",
      experience: "経験",
      basedIn: "拠点",
    },
    tech: {
      title: "技術スタック",
      subtitle: "アイデアを実現するために使用する技術とツール、常に学習し新しいイノベーションに適応しています。",
      additionalSkills: "追加スキル",
      frontend: "フロントエンド",
      styling: "スタイリング",
      tools: "ツールその他",
      backend: "バックエンド・データベース",
    },
    contact: {
      title: "お問い合わせ",
      subtitle: "プロジェクトのアイデアがあるか、コラボレーションをお考えですか？ぜひお聞かせください。",
      name: "名前",
      email: "メール",
      message: "メッセージ",
      send: "メッセージを送信",
      sending: "送信中...",
      success: "メッセージが正常に送信されました！",
      error: "メッセージの送信に失敗しました。もう一度お試しください。",
    },
    common: {
      loading: "読み込み中...",
      error: "何かが間違っています",
      retry: "再試行",
    },
  },
}

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
]

export const defaultLanguage: Language = "en"
