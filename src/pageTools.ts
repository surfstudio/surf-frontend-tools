const delayDuration = 150;

export const delayHistory = (Base) =>
  class extends Base {
    delayGo = <Link>(link: Link) =>
      setTimeout(() => {
        this.props.history.push(link);
      }, delayDuration);

    delayBack = () =>
      setTimeout(() => {
        this.props.history.goBack();
      }, delayDuration);
  };
