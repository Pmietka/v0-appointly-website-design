/**
 * Clean Floor Coatings flagship case study on /case-studies.
 *
 * Every chapter is built around one of Phil's interview clips on Mux. The
 * headline, pull quote and caption for a chapter only ever say what Phil says
 * in that clip, so the video is always the proof and the text is the caption.
 * Pull quotes are verbatim from the clip transcripts.
 *
 * The rest of the site (homepage cards, the at a glance numbers) still reads
 * the Clean Floor Coatings entry in lib/case-studies.ts.
 */

export type MuxClip = {
  playbackId: string;
  /** Seconds into the clip for the poster frame. */
  posterTime: number;
  /** Display length, e.g. "0:39". */
  length: string;
  /** Title Mux Data reports for this video. */
  title: string;
};

export type ChapterImage =
  | {
      kind: "photo";
      src: string;
      width: number;
      height: number;
      alt: string;
      caption: string;
      /** Crop the photo to a focal point instead of showing it whole. */
      crop?: { aspect: string; position: string };
    }
  | { kind: "calendar-pair"; caption: string }
  | { kind: "then-now"; caption: string }
  | { kind: "funnel"; caption: string };

export type Chapter = {
  id: string;
  nav: string;
  headline: string;
  clip: MuxClip;
  quote: string;
  caption: string;
  image: ChapterImage;
  /** Words kept in the clip, for the transcript accordion. */
  transcript: string[];
};

export const muxPoster = (playbackId: string, time: number, width = 1280) =>
  `https://image.mux.com/${playbackId}/thumbnail.webp?time=${time}&width=${width}`;

/* ── The long form interview ─────────────────────────────────────────────────
   Paste the full interview's Mux playback ID here. Until it is set, the hero
   plays the "a lead isn't a lead" clip instead and the label shows that clip's
   length. Chapter start times are in seconds into the full interview; any
   chapter left at null is skipped in the player's chapter menu. */
export const FULL_INTERVIEW = {
  playbackId: "",
  posterTime: 30,
  label: "Watch Phil, 9 min",
  title: "Phil A., Clean Floor Coatings: full interview",
  chapters: [
    { title: "Before", start: null },
    { title: "What changed", start: null },
    { title: "Buyers, not leads", start: null },
    { title: "Screening", start: null },
    { title: "We stand behind it", start: null },
    { title: "Why Phil stays", start: null },
  ] as { title: string; start: number | null }[],
};

/* Clip 08 ("we stand behind it", the refunded appointment story). Paste its
   Mux playback ID here and the chapter switches over to it automatically. */
const CLIP_08_PLAYBACK_ID = "";

const CLIPS = {
  leadIsntALead: {
    playbackId: "01m01jbccDjUAOJdKHM0102kMNrvYB1xp7HPrbwrs8i003y8",
    posterTime: 31,
    length: "0:39",
    title: "Phil A.: a lead isn't a lead",
  },
  businessGrowth: {
    playbackId: "deFz11g901e45Ugq1I1uhCZ800w00KXKBXvTeZILPEY4pc",
    posterTime: 13.5,
    length: "0:59",
    title: "Phil A.: booked five days a week",
  },
  appointmentQuality: {
    playbackId: "FG00ufX00pWBA2YRMyMZVGzPI178XQ3NEgkeZ8k4QUQ00w",
    posterTime: 8.5,
    length: "1:04",
    title: "Phil A.: before and after",
  },
  screening: {
    playbackId: "IIGeNBzzNDvVBtuPbWKotOGRZpO31D02DSXnj6ZvFVIE",
    posterTime: 28.5,
    length: "0:38",
    title: "Phil A.: the appointments we don't book",
  },
  otherAgencies: {
    playbackId: "kRS0067lEV1rZS5p3uTLXsgQzHZU6yDKqrRxoxNNPkB8",
    posterTime: 58.5,
    length: "1:05",
    title: "Phil A.: why other agencies don't work",
  },
  closer: {
    playbackId: "601bDBXsEPE6zLloFZpoa2KWlLyyheYEzfRBQRClfpT00",
    posterTime: 11,
    length: "0:44",
    title: "Phil A.: I don't even look at the creative",
  },
} satisfies Record<string, MuxClip>;

/** What plays in the hero right now. */
export const HERO_VIDEO = FULL_INTERVIEW.playbackId
  ? {
      clip: {
        playbackId: FULL_INTERVIEW.playbackId,
        posterTime: FULL_INTERVIEW.posterTime,
        length: "",
        title: FULL_INTERVIEW.title,
      },
      label: FULL_INTERVIEW.label,
      chapters: FULL_INTERVIEW.chapters.filter(
        (c): c is { title: string; start: number } => c.start !== null,
      ),
    }
  : {
      clip: { ...CLIPS.leadIsntALead, posterTime: 36 },
      label: `Watch Phil, ${CLIPS.leadIsntALead.length.replace(/^0:/, "")} sec`,
      chapters: [] as { title: string; start: number }[],
    };

const CAL = {
  week1: { src: "/images/case-studies/cfc-cal-week1.webp", width: 1447, height: 414, label: "Week 1" },
  week2: { src: "/images/case-studies/cfc-cal-week2.webp", width: 1410, height: 486, label: "Week 2" },
  week3: { src: "/images/case-studies/cfc-cal-week3.webp", width: 1445, height: 548, label: "Week 3" },
};

export const CFC_CALENDAR = [CAL.week1, CAL.week2, CAL.week3];

const standBehindIt: Chapter = CLIP_08_PLAYBACK_ID
  ? {
      id: "stand-behind-it",
      nav: "We stand behind it",
      headline: "When an appointment misses, we don't charge for it",
      clip: {
        playbackId: CLIP_08_PLAYBACK_ID,
        posterTime: 20,
        length: "",
        title: "Phil A.: we stand behind it",
      },
      quote:
        "The first thing you said to me was, well, I won't charge you for that.",
      caption:
        "A homeowner who still needed her driveway poured wasn't ready for a coating. Phil flagged it, and we took the appointment off his bill.",
      image: {
        kind: "photo",
        ...CAL.week2,
        alt: "Week 2 of Phil's estimate calendar, with eight appointments booked by Appointly.",
        caption: "Every appointment on this calendar is one we stand behind.",
      },
      transcript: [
        "I had a lady that I went to see that you booked the appointment, and she seemed like a really good customer. When I got there, she needed to have concrete work done on her driveway. She said, well, I'm going to have you do this and then I'm going to add this other thing and you can come back and do that too. And I said, that's not how it works. You know, you got to get your driveway the way you want it. We have to give the concrete two months to cure and then I'll come back and we'll measure after you're done. And I talked to you about that. And, you know, I didn't like going out there. And the first thing you said to me was, well, I won't charge you for that. That, you know, I understand that I don't want you to have to pay for that appointment. That wasn't a quality appointment.",
        "And you're making sure it's profitable for me. And you're not looking at me as a, you know, how much revenue you can get. You're like, how can I really help that guy's business grow so that we can have a long sustained situation.",
      ],
    }
  : {
      id: "stand-behind-it",
      nav: "We stand behind it",
      headline: "He doesn't even look at the ads",
      clip: CLIPS.closer,
      quote:
        "I feel like you attend to my account the same way I attend to theirs.",
      caption:
        "Phil doesn't manage the campaign or check the creative. On an average day, he says, two to six appointments land on his calendar by noon the next day.",
      image: {
        kind: "photo",
        ...CAL.week2,
        alt: "Week 2 of Phil's estimate calendar. Wednesday has three appointments before 1 PM, all booked by Appointly.",
        caption: "An ordinary Wednesday: three homeowners on the calendar before 1 PM.",
        crop: { aspect: "4 / 3", position: "44% 50%" },
      },
      transcript: [
        "I don't even look at the creative. I don't know what the creative is. I don't need to because I know the result is that I'm going to wake up tomorrow on an average day. I mean, you could do the math. You know it better than I do, but I'd say anywhere between two and six appointments will be booked for me between now and noon tomorrow.",
        "And so why would I even go look at the creative? Why would I care what, you know, what you're doing on Facebook? Because I know the result is that I get to go to people's house that are ready to buy epoxy jobs and have an expectation that I'm not going to be the cheapest guy, that it's not going to be the fastest job. They expect to pay a fair price and get a really good product. And I feel like you treat me with the same customer service that I treat those people with.",
        "And it's really nice that I feel like you attend to my account the same way I attend to theirs.",
      ],
    };

export const CHAPTERS: Chapter[] = [
  {
    id: "before",
    nav: "Before",
    headline: "Leads that wouldn't give a phone number",
    clip: CLIPS.appointmentQuality,
    quote:
      "They would text me a square footage and say, I got 440 square feet, what's your lowest price?",
    caption:
      "Phil's old leads were Facebook forms and price shoppers. Now every appointment arrives with two paragraphs on the homeowner, and the objection he expected about a young company with few reviews never comes up.",
    image: {
      kind: "then-now",
      caption: "Built from Phil's own description in this clip.",
    },
    transcript: [
      "In the past, you know, when I got leads that would come in, it might be somebody, for example, they filled out a Facebook form and was reluctant to give me their phone number. Like they literally wouldn't give me their phone number. Or they would text me a square footage and say, I got 440 square feet, what's your lowest price? Can you beat this other guy? And they're leads, but they're not gonna be readily converted into revenue.",
      "And what's happened with you and I is I get a verbose, two paragraphs from you that says, I talked to this guy, he just moved into his house. He's got a lot of stuff that he's going to need to move out. They have some damage and they're going to need to have this spalling repaired. And when I show up, these people, and I was kidding with you before, they think that you and I see each other in the office every day. They say, oh yeah, Jacob told me you'd be like this. And they're ready to buy.",
      "We don't have a lot of Google reviews, we haven't been in business a long time,",
      "the objection that I expect to get, which is that you're not as well established as these other companies, never comes up for me.",
    ],
  },
  {
    id: "what-changed",
    nav: "What changed",
    headline: "A full calendar changed the business model",
    clip: CLIPS.businessGrowth,
    quote: "I'm now booked up for five days for the next three weeks in a row.",
    caption:
      "A full calendar changed how Phil runs the company. He staffs crews for the whole week and buys inventory ahead, and one appointment often turns into two or three jobs in the same neighborhood.",
    image: {
      kind: "calendar-pair",
      caption: "Week 1 and week 3 of Phil's estimate calendar. Every blue block is a homeowner we qualified by phone.",
    },
    transcript: [
      "But what I didn't anticipate is that the job you got me into in some neighborhoods turns into two or three jobs. So the customer acquisition costs, you know, if I really wanted to confuse somebody, I'd say my close rate is probably 130%, because every appointment that I've gone on has averaged more than one job.",
      "To be honest, when I first started, I was doing maybe two or three floors a week. And it's a dilemma for me, because I don't do these floors myself, I have to hire a staff. So the question is, do you pay guys for five days? Or do you pay them for two or three and know that they're gonna go out and find another job, and it's going to be really hard to get them back. So when I started working with you, I'm now booked up for five days for the next three weeks in a row. So it changed my business model instead of this being a thing where, you know, I was hoping to get business. I now can staff accordingly. I could buy inventory in a better place.",
    ],
  },
  {
    id: "buyers-not-leads",
    nav: "Buyers not leads",
    headline: "He isn't buying leads. He's buying buyers.",
    clip: CLIPS.leadIsntALead,
    quote:
      "A lead isn't a lead. This is somebody that's at the bottom of the funnel ready to make a buying decision.",
    caption:
      "Google and Facebook leads are raw material Phil has to work. Our appointments are ready to close: some homeowners get a quote on Thursday and pay for the finished floor on Monday.",
    image: {
      kind: "funnel",
      caption: "The funnel, the way Phil draws it in this clip.",
    },
    transcript: [
      "If you're buying Google ads or Facebook ads, you're buying top of a funnel people, you're buying, you know, raw materials that you're gonna have to do a lot of work and convert into dollars. So what I'm doing with you guys is I'm buying people at the bottom of the funnel. They're ready to close. I don't have to go on a lot of superfluous calls, I don't have to do a lot of extra stuff, and I have accounts where I walk in on Thursday to do a quote, and on Monday they're running a credit card to pay for the job we did that Monday. So a lead isn't a lead. Like if somebody says, how much does a lead cost? This isn't a lead. This is somebody that's at the bottom of the funnel ready to make a buying decision.",
    ],
  },
  {
    id: "screening",
    nav: "Screening",
    headline: "The appointments we don't book",
    clip: CLIPS.screening,
    quote:
      "The day that you screened that, you saved me 2.5 hours and 100 miles on my car.",
    caption:
      "Homeowners waiting on a check, jobs that are too small, and anyone capping the price before we've seen the floor get screened out on the phone, before they reach Phil's calendar.",
    image: {
      kind: "photo",
      src: "/images/case-studies/cfc-landing-page.webp",
      width: 600,
      height: 800,
      alt: "The Clean Floor Coatings landing page Appointly built: a three step form asking what the homeowner wants coated before they can submit their details.",
      caption: "Screening starts before the call: every ad lands on this three step page we built for Phil.",
    },
    transcript: [
      "And to your credit, like you've ruled out a lot of people. You said, well, this lady wanted to do this, but she's waiting for her check to come in in February so I didn't book an appointment. And I appreciate that. You've done it a couple of times, and things like that, or jobs that are too small, or people that lowball you on the phone and say, you know, I'm going to do this, but I'm not going to pay more than $2,000. So don't come out here if you're going to ask for more. Like, you've screened those people. Like the day that you screened that, you saved me 2.5 hours and, you know, 100 miles on my car, and allowed me to be out in front of somebody else that might buy, instead of wasting a day chasing somebody that's going to allow me to lose money doing their job.",
    ],
  },
  standBehindIt,
  {
    id: "why-phil-stays",
    nav: "Why Phil stays",
    headline: "Built for 52 weeks a year, not one good month",
    clip: CLIPS.otherAgencies,
    quote: "I know that your interests and my interests are 100% aligned here.",
    caption:
      "Other agencies signed Phil up, then handed him off to be churned. We talk almost every day about one goal: taking Phil from one truck to three.",
    image: {
      kind: "photo",
      src: "/images/team/jacob.jpg",
      width: 737,
      height: 581,
      alt: "Jacob Mietka, co-founder of Appointly Solutions.",
      caption: "Jacob, co-founder of Appointly. Phil's homeowners greet him with “Jacob told me you'd be like this.”",
    },
    transcript: [
      "So I would say buy yourself 30 days and give it a try.",
      "I work with other marketing agencies, and I think this is why they don't work. They come to me with a plan that's between $199 a month and $2,000 a month, and their whole model is built on scalability. Like, I'm going to talk to the owner, he's going to get me in, we're going to get this thing going. And then as soon as it's going, they're going to push me down to a level where somebody that's offshore, they're just going to try to see how many of me they can get and churn.",
      "Your experience, I would say, as opposed to scalability, is on sustainability. Like the whole month that we're doing this, it's not about how much money you're gonna make this month or how much money I'm gonna make this month. It's really, I talk to you almost every day on how can we build this model so that it's sustainable. So that what we're doing now, we're gonna do for 52 weeks a year, that we can take Phil from one truck to three trucks.",
      "And I know that your interests and my interests are 100% aligned here. And I think the mistake with a lot of agencies is that they're not aligned.",
    ],
  },
];

/** Stat bar under the hero. `to` is what the number counts up to. */
export const CFC_STATS = [
  { prefix: "~", to: 70, suffix: "%", label: "Close rate on shown appointments" },
  { prefix: "", to: 37, suffix: "", label: "Shown appointments in month one" },
  { prefix: "", to: 5, suffix: " days", label: "A week, booked" },
  { prefix: "~$", to: 2600, suffix: "", label: "Monthly ad spend" },
];

export const CFC_STATS_NOTE =
  "Close rate counts immediate closes only, on appointments that have already taken place. Homeowners who sign later are not included, and Phil says one appointment often turns into two or three jobs in the same neighborhood.";
