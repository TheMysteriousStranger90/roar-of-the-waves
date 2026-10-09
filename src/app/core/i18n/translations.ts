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
    readonly coordinates: string;
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
    readonly noteAlbum: string;
    readonly loading: string;
    readonly error: string;
    readonly empty: string;
  };
  readonly coordinates: {
    readonly eyebrow: string;
    readonly title: string;
    readonly note: string;
    readonly filmsHeading: string;
    readonly musicHeading: string;
    readonly literatureHeading: string;
    /** Section labels for the literature tab, keyed by `BookShelf`. */
    readonly shelves: {
      readonly europeanAmerican: string;
      readonly russian: string;
      readonly technical: string;
    };
    readonly loading: string;
    readonly error: string;
    readonly empty: string;
  };
  readonly about: {
    readonly eyebrow: string;
    readonly titleLine1: string;
    readonly titleLine2: string;
    readonly portraitAlt: string;
    readonly prevPhotoLabel: string;
    readonly nextPhotoLabel: string;
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
    readonly madeBy: string;
    readonly emailLabel: string;
  };
  readonly notFound: {
    readonly title: string;
    readonly text: string;
    readonly cta: string;
  };
  readonly seo: {
    readonly home: { readonly title: string; readonly description: string };
    readonly music: { readonly title: string; readonly description: string };
    readonly coordinates: { readonly title: string; readonly description: string };
    readonly about: { readonly title: string; readonly description: string };
  };
}

export const translations: Record<Lang, Dictionary> = {
  en: {
    nav: {
      home: 'Home',
      music: 'Music',
      coordinates: 'Coordinates',
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
      lede: 'Sound as a vessel for storytelling and quiet catharsis — dark piano, cinematic soundscapes, and the weight of unspoken words.',
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
      note: 'Every release below stands alone as a single, not a part of something larger. All tracks are created at home entirely on a computer, with no live recordings and no professional studio: just a simple MIDI keyboard, MuseScore Studio, and Ableton Live. The core of the sound relies on the Spotlight Piano VST by Fracture Sounds. However, each track was an experiment with different chains of compression, EQ, and reverb. Due to a lack of deep mixing experience, this process left its mark in the form of occasional audio artifacts on certain releases.',
      noteAlbum: 'A full-length album may follow later — once enough of these individual works have gathered to form one unified whole, and when time, circumstances, and surroundings finally allow for giving music the attention it deserves — and capturing it at a much higher level of quality.',
      loading: 'Loading…',
      error: 'The catalogue could not be loaded right now.',
      empty: 'No tracks published yet.',
    },
    coordinates: {
      eyebrow: 'Points of reference',
      title: 'Coordinates',
      note: 'A personal map of my favorite works. These are the films, books, and music that I deeply resonate with and that directly inspired me to create.',
      filmsHeading: 'Cinema',
      musicHeading: 'Music',
      literatureHeading: 'Literature',
      shelves: {
        europeanAmerican: 'European and American literature',
        russian: 'Russian literature',
        technical: 'Technical literature',
      },
      loading: 'Loading…',
      error: 'The list could not be loaded right now.',
      empty: 'Nothing here yet.',
    },
    about: {
      eyebrow: 'About',
      titleLine1: 'Two distant',
      titleLine2: 'musical worlds',
      prevPhotoLabel: 'Previous photo',
      nextPhotoLabel: 'Next photo',
      portraitAlt: 'Portrait of the artist behind Roar of the Waves, seated at the piano',
      paragraph1:
        'Roar of the Waves is a one-man musical project where sound transcends mere composition to become a vessel for storytelling and quiet catharsis. Striving to blend the atmospheric touch of modern neoclassical music with the passionate depth of romanticism, the project paints poetic narratives through the prism of dark piano and cinematic soundscapes.',
      paragraph2:
        "For the creator behind Roar of the Waves, music is not a profession, but a vital way to speak when words fall short. His only formal musical training is six years of private piano lessons at a local music school, alongside a short period playing in a gothic metal band. Those years left their mark, becoming the soil for a later attempt to bridge two distant musical worlds that have deeply shaped its creator: the heavy, expressive grandeur of Russian classical music (Sergei Rachmaninoff, Alexander Scriabin, Sergei Prokofiev, Alexander Glazunov, among others) and the nostalgic, melancholic film scores of 1960s and 1970s French and Italian cinema (François de Roubaix, Philippe Sarde, Ennio Morricone, Franco Mannino, and many more).",
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
      madeBy: 'Site by',
      emailLabel: 'Email',
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
      coordinates: {
        title: 'Coordinates',
        description:
          'The films, records and books behind Roar of the Waves — a personal map of the works that shaped the sound of the project.',
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
      coordinates: 'Координаты',
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
      lede: 'Звук как сосуд для историй и тихого катарсиса — тёмное фортепиано, кинематографичные саундскейпы и тяжесть невысказанных слов.',
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
      note: 'Каждый релиз ниже — это самостоятельный сингл, а не часть чего-то большего. Все треки созданы дома исключительно на компьютере — без использования живых записей или профессиональной студии: только простая MIDI-клавиатура, MuseScore Studio и Ableton Live. В основе звучания неизменно лежит VST-плагин Spotlight Piano от Fracture Sounds. Однако при работе над каждым треком использовался разный набор компрессора, эквалайзера и реверберации, что в силу отсутствия большого опыта сведения привело к появлению звуковых артефактов на некоторых записях.',
      noteAlbum: 'Полноформатный альбом может появиться позже — когда таких отдельных работ накопится достаточно, чтобы сложить из них одно единое целое, и когда обстоятельства, время и условия наконец позволят уделять музыке то внимание, которого она заслуживает, а также делать записи на совершенно ином уровне качества.',
      loading: 'Загрузка…',
      error: 'Не удалось загрузить каталог прямо сейчас.',
      empty: 'Треки пока не опубликованы.',
    },
    coordinates: {
      eyebrow: 'Точки отсчёта',
      title: 'Координаты',
      note: 'Личная карта моих любимых произведений. Это фильмы, книги и музыка, которые мне по-настоящему близки и которые напрямую вдохновили меня на творчество.',
      filmsHeading: 'Кино',
      musicHeading: 'Музыка',
      literatureHeading: 'Литература',
      shelves: {
        europeanAmerican: 'Европейская и американская литература',
        russian: 'Русская литература',
        technical: 'Техническая литература',
      },
      loading: 'Загрузка…',
      error: 'Не удалось загрузить список прямо сейчас.',
      empty: 'Здесь пока пусто.',
    },
    about: {
      eyebrow: 'О проекте',
      titleLine1: 'Два далёких',
      titleLine2: 'музыкальных мира',
      prevPhotoLabel: 'Предыдущее фото',
      nextPhotoLabel: 'Следующее фото',
      portraitAlt: 'Портрет автора проекта Roar of the Waves за роялем',
      paragraph1:
        'Roar of the Waves — это сольный музыкальный проект, в котором звук выходит за рамки простой композиции и становится способом рассказывать истории и находить тихое очищение. Стремясь соединить атмосферность современной неоклассики со страстной глубиной романтизма, проект рисует поэтичные образы через призму тёмного фортепиано и кинематографичных саундскейпов.',
      paragraph2:
        'Для создателя Roar of the Waves музыка — не профессия, а насущный способ говорить тогда, когда не хватает слов. Его единственное формальное музыкальное образование — шесть лет индивидуальных занятий по классу фортепиано в местной музыкальной школе, наряду с недолгим периодом игры в готик-метал группе. Те годы оставили свой след, став почвой для более поздней попытки соединить два далёких музыкальных мира, глубоко повлиявших на его автора: тяжёлое, выразительное величие русской классической музыки (Сергей Рахманинов, Александр Скрябин, Сергей Прокофьев, Александр Глазунов и другие) и ностальгичные, меланхоличные саундтреки французского и итальянского кино 1960-х и 1970-х годов (Франсуа де Рубэ, Филипп Сард, Эннио Морриконе, Франко Маннино и многие другие).',
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
      madeBy: 'Разработка сайта —',
      emailLabel: 'Почта',
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
      coordinates: {
        title: 'Координаты',
        description:
          'Фильмы, пластинки и книги, стоящие за Roar of the Waves, — личная карта произведений, определивших звучание проекта.',
      },
      about: {
        title: 'О проекте',
        description:
          'История Roar of the Waves: русский романтический классицизм встречается с французскими и итальянскими киносаундтреками 1960–70-х годов.',
      },
    },
  },
};
