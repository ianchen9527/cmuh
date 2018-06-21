import React, { Component } from "react"
import styled from "styled-components"

import QRCodeUrl from "../../assets/images/kono_qr_code.png"
import AppStoreUrl from "../../assets/images/download_App_store.svg"
import GooglePlayUrl from "../../assets/images/download_google_play.svg"

import media from "../../../../../utilities/media"

const AppIconsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const QRCodeWrapper = styled.div`
  display: none;
  margin-right: 20px;
  height: 70px;

  ${media.desktop`display: block;`};
`

const QRCode = styled.img`
  width: auto;
  height: 70px;
`

const DownloadIconContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${media.desktop`
    justify-content: space-between;
    height: 70px;
    flex-direction: column;
  `};
`

const DownloadIconWrapper = styled.div`
  height: 30px;
  margin-right: 20px;
  ${media.desktop`margin: 0;`};
  ${media.mobile`height: 36px;`};
`

const ImageLink = styled.a`
  height: 30px;
  display: block;
  text-decoration: none;
  ${media.mobile`height: 36px;`};
`

const DownloadIcon = styled.img`
  width: auto;
  height: 30px;
  ${media.mobile`height: 36px;`};
`

class AppIcons extends Component {
  renderDownloadIcon(href, imageSrc) {
    return (
      <DownloadIconWrapper>
        <ImageLink href={href} target="_blank">
          <DownloadIcon src={imageSrc} />
        </ImageLink>
      </DownloadIconWrapper>
    )
  }

  render() {
    return (
      <AppIconsWrapper>
        <QRCodeWrapper>
          <QRCode src={QRCodeUrl} />
        </QRCodeWrapper>
        <DownloadIconContainer>
          {this.renderDownloadIcon("/", AppStoreUrl)}
          {this.renderDownloadIcon("/", GooglePlayUrl)}
        </DownloadIconContainer>
      </AppIconsWrapper>
    )
  }
}

export default AppIcons
