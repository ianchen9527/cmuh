import { css } from "styled-components";

const media = {
  desktop: (...args) => css`
    @media (min-width: 1024px) {
      ${css(...args)}
    }
  `,

  tablet: (...args) => css`
    @media (min-width: 600px) and (max-width: 1023px) {
      ${css(...args)}
    }
  `,

  mobile: (...args) => css`
    @media (max-width: 599px) {
      ${css(...args)}
    }
  `
}

export default media
