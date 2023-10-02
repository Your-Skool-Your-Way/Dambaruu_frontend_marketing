const appRoute = {
  dashboard: "/dashboard",
  odia: "/odia",
  login: "/",
  content: "/content",
  contentod: "/contentod",
  subjectod: "/subjectod",
  subject: "/subjects",
  videood: "/videood",
  video: "/video",
  language: "/language",
  activity: "/activity"
};

const apiEndPoint = {
  content: "/courses/content/",
  contentod: "/anganwadi/odia/content/",
  standard: "/courses/standard/",
  odia: "/anganwadi/odia/standard/",
  user: "/user/user-login/",
  topic: "/courses/topic/",
  topicod: "/anganwadi/odia/topic/",
  subject: "/courses/subject/",
  subjectod: "/anganwadi/odia/subject/",
  activity: "/courses/activity/",
  alphabet: "/courses/activity_alphabet/",
  number:"/courses/activity_number/",
  thumbnails:"/courses/activity_thumbnails/",
  tracingalphabet:"/courses/activity_gif/",
};

export { appRoute, apiEndPoint };
