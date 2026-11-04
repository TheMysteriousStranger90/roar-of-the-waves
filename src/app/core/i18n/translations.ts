/**
 * Site-wide UI copy for every supported language.
 *
 * The project name "Roar of the Waves" and social/brand labels are treated as
 * proper nouns and intentionally left untranslated in both languages.
 */
export type Lang = 'en' | 'ru';

export const SUPPORTED_LANGS: readonly Lang[] = ['en', 'ru'];
export const DEFAULT_LANG: Lang = 'en';

export interface AiCheckTool {
  readonly name: string;
  readonly figure: string;
  readonly figureNote: string;
  readonly what: string;
  readonly result: string;
  readonly limits: string;
}

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
  readonly aiCheck: {
    readonly musicLink: string;
    readonly eyebrow: string;
    readonly title: string;
    readonly lede: string;
    readonly checkedOn: string;
    readonly tabsLabel: string;
    readonly screenshotsLabel: string;
    readonly lightbox: {
      readonly dialog: string;
      readonly close: string;
      readonly previous: string;
      readonly next: string;
      readonly openOriginal: string;
    };
    readonly labels: {
      readonly what: string;
      readonly result: string;
      readonly limits: string;
    };
    readonly openTool: string;
    readonly deezer: AiCheckTool;
    readonly wavespeed: AiCheckTool;
    readonly aha: AiCheckTool;
    readonly exiftools: AiCheckTool;
    readonly captions: {
      readonly deezerLibrary: string;
      readonly deezerPlaylist: string;
      readonly deezerResult: string;
      readonly deezerShare: string;
    };
    readonly alts: {
      readonly deezerLibrary: string;
      readonly deezerPlaylist: string;
      readonly deezerResult: string;
      readonly deezerShare: string;
      readonly wavespeed: string;
      readonly aha: string;
      readonly exiftools: string;
    };
    readonly readingTitle: string;
    readonly reading: string;
    readonly verifyTitle: string;
    readonly verify: string;
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
    readonly aiCheck: { readonly title: string; readonly description: string };
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
    aiCheck: {
      musicLink: 'Results of the AI check →',
      eyebrow: 'Authenticity',
      title: 'AI check',
      tabsLabel: 'Checking services',
      screenshotsLabel: 'Screenshots',
      lightbox: {
        dialog: 'Screenshot viewer',
        close: 'Close',
        previous: 'Previous screenshot',
        next: 'Next screenshot',
        openOriginal: 'Open original ↗',
      },
      lede: 'Solo piano made at home with a sample library is often mistaken for AI output. Every track here is made by one person with a MIDI keyboard, MuseScore Studio and Ableton Live, as described on the Music page. All five tracks were also run through four separate AI-music checks: three audio detectors and one metadata check. None of them flagged a single track as AI-generated.',
      checkedOn: 'Checks run on 2 and 3 November 2026. The original lossless FLAC files were uploaded to WaveSpeed, aha-music and ExifTools; Deezer checked the tracks as published on its platform. The screenshots are shown in full, uncropped.',
      labels: { what: 'What it checks', result: 'Result', limits: 'Limits' },
      openTool: 'Open the tool ↗',
      deezer: {
        name: 'Deezer AI Music Detector',
        figure: '0%',
        figureNote: 'of the playlist flagged as AI',
        what: 'Deezer’s own detector. Deezer says its detection technology targets fully AI-generated tracks from generators such as Suno and Udio, with 99.8% accuracy. All five tracks were put into one playlist and scanned together.',
        result: 'The AI score is 0%: none of the five tracks was flagged as AI-generated.',
        limits: 'The accuracy figure is Deezer’s own claim, and the tool is aimed at fully AI-generated music.',
      },
      wavespeed: {
        name: 'WaveSpeed AI Music Detector',
        figure: '0%',
        figureNote: 'AI-generated likelihood, every track',
        what: 'Analyses the audio itself, looking for the traces AI music generators leave in the sound. Each track was uploaded as a lossless FLAC file, without lossy compression, which the tool says can affect its result. For tracks longer than 3:00, the tool analyses the first three minutes.',
        result: 'Every track came back “Likely human-made”, with high confidence and a 0% AI-generated likelihood.',
        limits: 'The tool itself calls its output “an estimate, not proof”.',
      },
      aha: {
        name: 'aha-music AI Music Detector',
        figure: '1.1–1.2%',
        figureNote: 'AI probability, every track',
        what: 'Analyses the uploaded audio file and estimates how likely it is to be AI-generated. It also reports which AI platform it suspects, if any, and shows an analysis of the full track. Each track was uploaded as a lossless FLAC file. The free version allows three checks per day, so the five tracks were checked over two days.',
        result: 'Every track came back as “Human-Made Music”: 1.1% AI for The Fatalist’s Path, Eternity and The Lighthouse by the Sea, and 1.2% for Dancing on the Embankment and Senza parole. The AI platform field reads “Human” and the recognition confidence is 95%.',
        limits: 'The scores are low but not exactly 0%. As with any detector, this is an estimate, not proof; for every track the tool’s own verdict is “Human-Made Music”.',
      },
      exiftools: {
        name: 'ExifTools AI Music Checker',
        figure: 'No AI marks',
        figureNote: 'in any of the five files',
        what: 'Reads the file’s metadata for the marks that AI music services leave (Suno, Udio, ElevenLabs and others) and for Content Credentials that declare AI generation.',
        result: 'No AI marks and no Content Credentials in any of the five files. The tags show the track title, the artist Roar of the Waves and the FLAC encoder.',
        limits: 'Metadata shows only what a file declares. As the tool itself says, AI music services don’t always tag their files and tags are easy to remove, so “no marks” does not prove a person made it. This check supports the audio analyses; it does not replace them.',
      },
      captions: {
        deezerLibrary: 'Deezer: the “Roar of the Waves” playlist in the library (5 tracks)',
        deezerPlaylist: 'Deezer: the five tracks in the scanned playlist',
        deezerResult: 'Deezer: the AI score of the playlist',
        deezerShare: 'Deezer: the shareable result card',
      },
      alts: {
        deezerLibrary: 'Deezer library with the “Roar of the Waves” playlist of 5 tracks',
        deezerPlaylist: 'The Deezer playlist with the five Roar of the Waves tracks that were scanned',
        deezerResult: 'Deezer AI Music Detector result page showing an AI score of 0%',
        deezerShare: 'Deezer result card: 0% of my music was detected as AI-generated',
        wavespeed: 'WaveSpeed AI Music Detector result for “{title}”: 0% AI-generated likelihood, likely human-made, high confidence',
        aha: 'aha-music AI Music Detector result for “{title}”: Human-Made Music, about 1% AI, 95% recognition confidence',
        exiftools: 'ExifTools AI Music Checker result for “{title}”: no AI music marks found',
      },
      readingTitle: 'How to read this',
      reading: 'No detector can prove who made a piece of music; WaveSpeed and ExifTools say so on their own result pages. What counts is that the checks agree: three audio detectors (Deezer, WaveSpeed, aha-music) and one metadata check (ExifTools), and none of them flagged a track as AI-generated. The result also fits how the music is made, described on the Music page. The occasional audio artifacts mentioned there come from limited mixing experience, not from a generator.',
      verifyTitle: 'Check it yourself',
      verify: 'Anyone can repeat these checks with the tools linked above. They were run on the original lossless files; on audio downloaded from streaming services the results may differ slightly, because heavy compression can affect audio analysis.',
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
        'Every track is a self-contained story — a reflection on solitude, the beauty of fleeting moments, and the fragile stillness that settles after heavy thoughts.',
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
      aiCheck: {
        title: 'AI check',
        description:
          'Results of four separate AI-music checks (Deezer, WaveSpeed, aha-music, ExifTools) for the Roar of the Waves tracks, with full screenshots and an explanation of what they mean.',
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
    aiCheck: {
      musicLink: 'Результаты проверки на ИИ →',
      eyebrow: 'Подлинность',
      title: 'Проверка на ИИ',
      tabsLabel: 'Сервисы проверки',
      screenshotsLabel: 'Скриншоты',
      lightbox: {
        dialog: 'Просмотр скриншотов',
        close: 'Закрыть',
        previous: 'Предыдущий скриншот',
        next: 'Следующий скриншот',
        openOriginal: 'Открыть оригинал ↗',
      },
      lede: 'Сольное фортепиано, записанное дома с помощью библиотеки семплов, нередко принимают за результат работы ИИ. Каждый трек здесь создан одним человеком с помощью MIDI-клавиатуры, MuseScore Studio и Ableton Live, как описано на странице «Музыка». Все пять треков также прошли четыре отдельные проверки на ИИ-музыку: три анализа звука и одну проверку метаданных. Ни одна из них не отметила ни один трек как созданный ИИ.',
      checkedOn: 'Проверки выполнены 2 и 3 ноября 2026 года. В WaveSpeed, aha-music и ExifTools загружались оригинальные lossless-файлы FLAC; Deezer проверил треки, опубликованные на своей платформе. Скриншоты показаны полностью, без обрезки.',
      labels: { what: 'Что проверяет', result: 'Результат', limits: 'Ограничения' },
      openTool: 'Открыть сервис ↗',
      deezer: {
        name: 'Deezer AI Music Detector',
        figure: '0%',
        figureNote: 'плейлиста отмечено как ИИ',
        what: 'Собственный детектор Deezer. По заявлению Deezer, их технология нацелена на полностью сгенерированные ИИ треки от таких генераторов, как Suno и Udio, и работает с точностью 99,8%. Все пять треков были собраны в один плейлист и проверены вместе.',
        result: 'AI score — 0%: ни один из пяти треков не был отмечен как созданный ИИ.',
        limits: 'Показатель точности — заявление самой Deezer, а инструмент рассчитан на полностью сгенерированную ИИ музыку.',
      },
      wavespeed: {
        name: 'WaveSpeed AI Music Detector',
        figure: '0%',
        figureNote: 'вероятность ИИ, каждый трек',
        what: 'Анализирует сам звук, ища следы, которые оставляют генераторы ИИ-музыки. Каждый трек был загружен в виде lossless-файла FLAC, то есть без сжатия с потерями, которое, по словам сервиса, может повлиять на результат. У треков длиннее 3:00 сервис анализирует первые три минуты.',
        result: 'Каждый трек получил вердикт «Likely human-made» (вероятно, создан человеком) с высокой уверенностью и вероятностью ИИ 0%.',
        limits: 'Сам сервис называет свой результат «оценкой, а не доказательством».',
      },
      aha: {
        name: 'aha-music AI Music Detector',
        figure: '1,1–1,2%',
        figureNote: 'вероятность ИИ, каждый трек',
        what: 'Анализирует загруженный аудиофайл и оценивает вероятность того, что он создан ИИ. Также показывает, какую ИИ-платформу сервис подозревает (если есть), и показывает анализ полного трека. Каждый трек был загружен в виде lossless-файла FLAC. В бесплатной версии доступно три проверки в день, поэтому пять треков проверялись в течение двух дней.',
        result: 'Каждый трек получил вердикт «Human-Made Music» (музыка, созданная человеком): 1,1% ИИ у «Пути фаталиста», «Вечности» и «Маяка у моря» и 1,2% у «Танцев на набережной» и «Без слов». В поле AI Platform указано «Human», уверенность распознавания — 95%.',
        limits: 'Значения низкие, но не равны нулю. Как и любой детектор, сервис даёт оценку, а не доказательство; для каждого трека его собственный вердикт — «Human-Made Music».',
      },
      exiftools: {
        name: 'ExifTools AI Music Checker',
        figure: 'Меток ИИ нет',
        figureNote: 'ни в одном из пяти файлов',
        what: 'Читает метаданные файла в поисках меток, которые оставляют ИИ-сервисы (Suno, Udio, ElevenLabs и другие), а также Content Credentials, заявляющих о генерации ИИ.',
        result: 'Ни меток ИИ, ни Content Credentials в пяти файлах не найдено. В тегах указаны название трека, исполнитель Roar of the Waves и кодировщик FLAC.',
        limits: 'Метаданные показывают лишь то, что файл сам о себе заявляет. Как сказано в самом сервисе, ИИ-сервисы не всегда добавляют теги, а теги легко удалить, поэтому отсутствие меток не доказывает, что трек создал человек. Эта проверка поддерживает анализ звука, а не заменяет его.',
      },
      captions: {
        deezerLibrary: 'Deezer: плейлист «Roar of the Waves» в медиатеке (5 треков)',
        deezerPlaylist: 'Deezer: пять треков в проверенном плейлисте',
        deezerResult: 'Deezer: AI score плейлиста',
        deezerShare: 'Deezer: карточка с результатом для публикации',
      },
      alts: {
        deezerLibrary: 'Медиатека Deezer с плейлистом «Roar of the Waves» из 5 треков',
        deezerPlaylist: 'Плейлист Deezer с пятью проверенными треками Roar of the Waves',
        deezerResult: 'Страница результата Deezer AI Music Detector: AI score 0%',
        deezerShare: 'Карточка результата Deezer: 0% моей музыки определено как созданная ИИ',
        aha: 'Результат aha-music AI Music Detector для «{title}»: Human-Made Music, около 1% ИИ, уверенность распознавания 95%',
        wavespeed: 'Результат WaveSpeed AI Music Detector для «{title}»: вероятность ИИ 0%, вероятно создан человеком, высокая уверенность',
        exiftools: 'Результат ExifTools AI Music Checker для «{title}»: меток ИИ-музыки не найдено',
      },
      readingTitle: 'Как читать эти результаты',
      reading: 'Ни один детектор не может доказать, кто создал музыку: WaveSpeed и ExifTools прямо пишут об этом на страницах результатов. Важно другое: проверки сходятся — три анализа звука (Deezer, WaveSpeed, aha-music) и одна проверка метаданных (ExifTools), и ни одна не отметила трек как созданный ИИ. Результат также согласуется с тем, как создаётся музыка, о чём сказано на странице «Музыка». Упомянутые там звуковые артефакты вызваны небольшим опытом сведения, а не генератором.',
      verifyTitle: 'Проверьте сами',
      verify: 'Эти проверки может повторить каждый с помощью сервисов по ссылкам выше. Они выполнялись на оригинальных lossless-файлах; для аудио, скачанного со стриминговых сервисов, результаты могут немного отличаться: сильное сжатие влияет на анализ звука.',
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
        'Каждый трек — самостоятельная история: размышление об одиночестве, красоте мимолётных мгновений и хрупкой тишине, воцаряющейся после тяжёлых дум.',
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
      aiCheck: {
        title: 'Проверка на ИИ',
        description:
          'Результаты четырёх отдельных проверок на ИИ-музыку (Deezer, WaveSpeed, aha-music, ExifTools) для треков Roar of the Waves: полные скриншоты и объяснение, что они означают.',
      },
    },
  },
};
