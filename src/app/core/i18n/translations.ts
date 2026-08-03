/**
 * Site-wide UI copy for every supported language.
 *
 * The project name "Roar of the Waves" and social/brand labels are treated as
 * proper nouns and intentionally left untranslated in both languages.
 */
export type Lang = 'en' | 'ru';

export const SUPPORTED_LANGS: readonly Lang[] = ['en', 'ru'];
export const DEFAULT_LANG: Lang = 'en';

export interface Dictionary {
  readonly nav: {
    readonly home: string;
    readonly music: string;
    readonly about: string;
  };
  readonly header: {
    readonly themeLight: string;
    readonly themeDark: string;
    readonly themeToggleAriaLabel: string;
    readonly langToggleAriaLabel: string;
  };
  readonly home: {
    readonly eyebrow: string;
    readonly lede: string;
    readonly cta: string;
    readonly selectedWorkEyebrow: string;
    readonly loading: string;
    readonly error: string;
    readonly empty: string;
    readonly readStory: string;
  };
  readonly music: {
    readonly eyebrow: string;
    readonly title: string;
    readonly note: string;
    readonly loading: string;
    readonly error: string;
    readonly empty: string;
  };
  readonly about: {
    readonly eyebrow: string;
    readonly titleLine1: string;
    readonly titleLine2: string;
    readonly portraitAlt: string;
    readonly paragraph1: string;
    readonly paragraph2: string;
  };
  readonly shared: {
    /** Used verbatim on both the home page (as a pull quote) and the about page. */
    readonly everyTrackStory: string;
  };
  readonly trackCard: {
    readonly listenOn: string;
  };
  readonly footer: {
    readonly tagline: string;
  };
  readonly notFound: {
    readonly title: string;
    readonly text: string;
    readonly cta: string;
  };
  readonly seo: {
    readonly home: { readonly title: string; readonly description: string };
    readonly music: { readonly title: string; readonly description: string };
    readonly about: { readonly title: string; readonly description: string };
  };
}

export const translations: Record<Lang, Dictionary> = {
  en: {
    nav: {
      home: 'Home',
      music: 'Music',
      about: 'About',
    },
    header: {
      themeLight: 'Light',
      themeDark: 'Dark',
      themeToggleAriaLabel: 'Switch theme',
      langToggleAriaLabel: 'Switch language',
    },
    home: {
      eyebrow: 'One-man musical project',
      lede: 'Sound as a vessel for storytelling and quiet catharsis — dark piano, cinematic soundscapes, and the fragile stillness that follows a long journey.',
      cta: 'Listen',
      selectedWorkEyebrow: 'Selected work',
      loading: 'Loading…',
      error: 'The catalogue could not be loaded right now.',
      empty: 'No tracks published yet.',
      readStory: 'Read the story',
    },
    music: {
      eyebrow: 'Discography',
      title: 'Music',
      note: 'Every release below stands on its own as a single — a self-contained story rather than a chapter of a larger one. A full-length album may follow once enough of these stories have gathered to tell it.',
      loading: 'Loading…',
      error: 'The catalogue could not be loaded right now.',
      empty: 'No tracks published yet.',
    },
    about: {
      eyebrow: 'About',
      titleLine1: 'Two distant',
      titleLine2: 'musical worlds',
      portraitAlt: 'Portrait of the artist behind Roar of the Waves, seated at the piano',
      paragraph1:
        'Roar of the Waves is a one-man musical project where sound transcends mere composition to become a vessel for storytelling and quiet catharsis. Striving to blend the atmospheric touch of modern neoclassical music with the passionate depth of romanticism, the project paints poetic narratives through the prism of dark piano and cinematic soundscapes.',
      paragraph2:
        "For the creator behind Roar of the Waves, music is not a profession, but a vital way to speak when words fall short. The project's sonic architecture is an attempt to bridge two distant musical worlds that have deeply shaped its creator: the heavy, expressive grandeur of Russian classical music (Rachmaninoff, Scriabin, Prokofiev, Glazunov) and the nostalgic, melancholic film scores of 1960s and 1970s French and Italian cinema (François de Roubaix, Philippe Sarde, Ennio Morricone, Bruno Nicolai).",
    },
    shared: {
      everyTrackStory:
        'Every track is a self-contained story — a reflection on solitude, the beauty of fleeting moments, and the fragile stillness that follows a long journey.',
    },
    trackCard: {
      listenOn: 'Listen on SoundCloud ↗',
    },
    footer: {
      tagline: 'Dark piano and cinematic soundscapes',
    },
    notFound: {
      title: 'Silence',
      text: 'This page does not exist — but the music does.',
      cta: 'Return home',
    },
    seo: {
      home: {
        title: 'Home',
        description:
          'Roar of the Waves — a one-man neoclassical project of dark piano and cinematic soundscapes.',
      },
      music: {
        title: 'Music',
        description:
          'The singles of Roar of the Waves — neoclassical piano and cinematic soundscapes, released one self-contained story at a time.',
      },
      about: {
        title: 'About',
        description:
          'The story behind Roar of the Waves: Russian romantic classicism meets 1960s–70s French and Italian film scores.',
      },
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      music: 'Музыка',
      about: 'О проекте',
    },
    header: {
      themeLight: 'Светлая',
      themeDark: 'Тёмная',
      themeToggleAriaLabel: 'Сменить тему',
      langToggleAriaLabel: 'Сменить язык',
    },
    home: {
      eyebrow: 'Сольный музыкальный проект',
      lede: 'Звук как способ рассказать историю и найти тихое очищение — тёмное фортепиано, кинематографичные саундскейпы и хрупкая тишина, наступающая после долгого пути.',
      cta: 'Слушать',
      selectedWorkEyebrow: 'Избранное',
      loading: 'Загрузка…',
      error: 'Не удалось загрузить каталог прямо сейчас.',
      empty: 'Треки пока не опубликованы.',
      readStory: 'Читать историю',
    },
    music: {
      eyebrow: 'Дискография',
      title: 'Музыка',
      note: 'Каждый релиз ниже существует сам по себе, как сингл, — самостоятельная история, а не глава чего-то большего. Полноформатный альбом может появиться, когда таких историй накопится достаточно, чтобы рассказать её.',
      loading: 'Загрузка…',
      error: 'Не удалось загрузить каталог прямо сейчас.',
      empty: 'Треки пока не опубликованы.',
    },
    about: {
      eyebrow: 'О проекте',
      titleLine1: 'Два далёких',
      titleLine2: 'музыкальных мира',
      portraitAlt: 'Портрет автора проекта Roar of the Waves за роялем',
      paragraph1:
        'Roar of the Waves — это сольный музыкальный проект, в котором звук выходит за рамки простой композиции и становится способом рассказывать истории и находить тихое очищение. Стремясь соединить атмосферность современной неоклассики со страстной глубиной романтизма, проект рисует поэтичные образы через призму тёмного фортепиано и кинематографичных саундскейпов.',
      paragraph2:
        'Для создателя Roar of the Waves музыка — не профессия, а насущный способ говорить тогда, когда не хватает слов. Звуковая архитектура проекта — это попытка соединить два далёких музыкальных мира, глубоко повлиявших на его автора: тяжёлое, выразительное величие русской классической музыки (Рахманинов, Скрябин, Прокофьев, Глазунов) и ностальгичные, меланхоличные саундтреки французского и итальянского кино 1960-х и 1970-х годов (Франсуа де Рубе, Филипп Сард, Эннио Морриконе, Бруно Николаи).',
    },
    shared: {
      everyTrackStory:
        'Каждый трек — самостоятельная история: размышление об одиночестве, красоте мимолётных мгновений и хрупкой тишине, наступающей после долгого пути.',
    },
    trackCard: {
      listenOn: 'Слушать на SoundCloud ↗',
    },
    footer: {
      tagline: 'Тёмное фортепиано и кинематографичные саундскейпы',
    },
    notFound: {
      title: 'Тишина',
      text: 'Такой страницы не существует, а музыка — существует.',
      cta: 'Вернуться на главную',
    },
    seo: {
      home: {
        title: 'Главная',
        description:
          'Roar of the Waves — сольный неоклассический проект: тёмное фортепиано и кинематографичные саундскейпы.',
      },
      music: {
        title: 'Музыка',
        description:
          'Синглы Roar of the Waves — неоклассическое фортепиано и кинематографичные саундскейпы, выходящие по одной самостоятельной истории за раз.',
      },
      about: {
        title: 'О проекте',
        description:
          'История Roar of the Waves: русский романтический классицизм встречается с французскими и итальянскими киносаундтреками 1960–70-х годов.',
      },
    },
  },
};
