import Swiper from 'swiper/bundle';
import MicroModal from 'micromodal';
import Player from '@vimeo/player';
import axios from 'axios';

import { fullPage, commentConfig } from './config/swiper';

MicroModal.init();

const fullPageSwiper = new Swiper('.full-page-slider', fullPage);
// const commentSwiper = new Swiper('.members-comment-list', commentConfig);

const player = new Player('video-iframe');

const thousandSeparate = (num) => {
  return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};

document.querySelectorAll('.play-video').forEach((ele) => {
  ele.addEventListener('click', () => {
    player.play().catch((e) => {});
  });
});

// document.querySelectorAll('.open-video').forEach((ele) => {
//   ele.addEventListener('click', () => {
//     try {
//       player.requestFullscreen().then(() => {
//         player.play();
//       });
//     } catch (error) {}
//   });
// });

document.querySelectorAll('.pause-video').forEach((ele) => {
  ele.addEventListener('click', () => {
    player
      .pause()
      .then(() => {})
      .catch((error) => {});
  });
});

document.querySelectorAll('.nav .nav-header a').forEach((ele, index) => {
  ele.addEventListener('click', () => {
    fullPageSwiper.slideTo(index);
    document.querySelector('.nav').classList.remove('active');
    document.querySelector('.nav-icon').classList.remove('active');
  });
});

document.querySelector('.nav-icon').addEventListener('click', (e) => {
  e.preventDefault();
  const element = e.currentTarget;
  element.classList.toggle('active');
  document.querySelector('.nav').classList.toggle('active');
});

document.querySelectorAll('.tau-list-item-header').forEach((ele) => {
  ele.addEventListener('click', (e) => {
    const isActive = e.currentTarget.parentElement.classList.contains('active');

    if (isActive) {
      e.currentTarget.parentElement.classList.remove('active');
      return;
    }

    document.querySelectorAll('.tau-list-item').forEach((item) => {
      item.classList.remove('active');
    });

    ele.parentElement.classList.add('active');
  });
});

document.querySelectorAll('.btcst-list-item-header').forEach((ele) => {
  ele.addEventListener('click', (e) => {
    const isActive = e.currentTarget.parentElement.classList.contains('active');

    if (isActive) {
      e.currentTarget.parentElement.classList.remove('active');
      return;
    }

    document.querySelectorAll('.btcst-list-item').forEach((item) => {
      item.classList.remove('active');
    });

    ele.parentElement.classList.add('active');
  });
});

document.querySelectorAll('.mobile-pagination').forEach((ele, index) => {
  ele.children[0].addEventListener('click', (e) => {
    e.preventDefault();
    if (fullPageSwiper.isEnd) {
      fullPageSwiper.slidePrev();
    } else {
      fullPageSwiper.slideNext();
    }
  });
});

axios.get('https://api.1-b.tc/api/tvl/').then((response) => {
  const data = response.data;
  let tvl = 0;

  if (data.code === 0) {
    tvl = thousandSeparate(parseInt(data.data.tvl));
  }

  document.querySelector('.tvl-num').innerHTML = `$${tvl}`;
});

axios.get('https://api.1-b.tc/api/getTXInfo/').then((response) => {
  const data = response.data;
  let bcsTXCount = 0;
  let activeAddressCount = 0;

  if (data.code === 0) {
    bcsTXCount = thousandSeparate(parseInt(data.data.bsc_tx_count));
    activeAddressCount = thousandSeparate(
      parseInt(data.data.active_address_count)
    );
  }

  document.querySelector(
    '.active-address-num'
  ).innerHTML = `${activeAddressCount}`;
  document.querySelector('.bsc-tx-num').innerHTML = `${bcsTXCount}`;
});
