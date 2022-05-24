import React from "react";
interface Iscrolls {
  renderTrackVertical: <Props>(props: Props) => JSX.Element;
  renderThumbVertical: <Props>(props: Props) => any;
  renderTrackHorizontal: <Props>(props: Props) => any;
  renderThumbHorizontal: <Props>(props: Props) => any;
  hideTracksWhenNotNeeded: boolean;
}

const scrolls: Iscrolls = {
  renderTrackVertical: (props) => <div {...props} className="v-scroll-track" />,
  renderThumbVertical: (props) => <div {...props} className="v-scroll-thumb" />,
  renderTrackHorizontal: (props) => (
    <div {...props} className="h-scroll-track" />
  ),
  renderThumbHorizontal: (props) => (
    <div {...props} className="h-scroll-thumb" />
  ),
  hideTracksWhenNotNeeded: true,
};

const dates = {
  full: "YYYY-MM-DDTHH:mm:ss.000Z",
  z: "YYYY-MM-DDTHH:mm:ssZ",
  def: "YYYY-MM-DDTHH:mm:ss",
  classic: "DD.MM.YYYY",
  nice: "D MMMM YYYY",
  time: "HH:mm",
};

const apiUrl = process.env.REACT_APP_BASE,
  version = process.env.REACT_APP_VERSION || "DEV-UNKNOWN";

const config = {
  title: "MARS",
  version,

  api: {
    url: apiUrl,
    files: `${apiUrl}file/download`,
    file: `${apiUrl}file/download-direct-link`,
    upload: `${apiUrl}file`,
  },

  filters: {
    unique: (item, index, arr) => arr.indexOf(item) === index,
  },

  scrolls,

  ui: {
    prefix: "_mrs",
    dates,
    stub: (count) =>
      new Array(count || 4).fill(0).map((z, i) => ({ id: i, title: "" })),
    notifications: {
      getContainer: () => document.querySelector(".app-page"),
      duration: 2,
    },
    globalErrorMessage: (
      <span className="global-error-content-inline">
        <strong>Что-то пошло не так</strong>
        <span>Проверь подключение к сети и обнови экран</span>
        <small>
          <span
            className="ant-btn ant-btn-primary"
            onClick={() => window.location.reload()}
          >
            Обновить
          </span>
          .
        </small>
      </span>
    ),
  },

  enums: {
    statementStatus: {
      ACCEPTED: "Принята",
      REJECTED: "Отклонена",
      PROCESSED: "Обработана",
      NOT_PROCESSED: "Не обработана",
      CANCELED: "Отменена",
    },
    statementStatusEx: {
      ACCEPTED: "Заявка принята",
      REJECTED: "Заявка отклонена",
      PROCESSED: "Заявка обработана",
      NOT_PROCESSED: "Заявка еще не обработана",
      CANCELED: "Заявка отменена",
    },
    admins: {
      ROLE_ADMIN: "Администратор",
      ROLE_SUPER_ADMIN: "Супер админ",
    },
  },

  drafts: {
    product: {
      productId: null,
      productName: "",
      productPhotoUrl: "",
      price: 0,
      inStock: 0,
    },
    news: {
      newsId: null,
      name: "",
      lead: "",
      text: "",
      pictureUr: "",
    },
    productStatements: {
      date: "",
      email: "",
      employeeExternalId: "",
      fullname: "",
      phoneNumber: "",
      price: null,
      productName: "",
      productPhotoUrl: "",
      statementId: null,
      status: "",
      statusDate: "",
    },
    achievements: {
      statementId: null,
      date: "",
      fileUrls: [],
      fullname: "",
      name: "",
      points: null,
      statusDate: "",
      status: "",
    },
    question: {
      answers: [
        {
          answerId: "a-0",
          answer: "",
          isCorrect: false,
        },
        {
          answerId: "a-1",
          answer: "",
          isCorrect: false,
        },
      ],
      questionId: null,
      questionName: "",
    },
    answer: {
      answerId: null,
      answer: "",
      isCorrect: false,
    },
    lesson: {
      lessonId: null,
      lessonName: "",
      lessonLead: "",
      lessonData: [],
      questionsAmount: 0,
      visibleQuestions: 5,
      fileUrls: [],
      questions: [],
    },
  },
};

export default Object.freeze(Object.assign({}, config));
