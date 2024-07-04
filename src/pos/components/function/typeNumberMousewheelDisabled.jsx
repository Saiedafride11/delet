export const typeNumberMousewheelDisabled = () => {
  const numberInputs = document.querySelectorAll('input[type="number"]');
  numberInputs.forEach((input) => {
    input.addEventListener("wheel", (e) => {
      e.preventDefault();
      //   e.currentTarget.blur();
    });
  });
};
