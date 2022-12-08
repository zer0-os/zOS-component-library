export enum Icons {
  ChevronLeft = 'chevron-left',
  ChevronRight = 'chevron-right',
  Sun = 'sun',
  Moon = 'moon',
  Close = 'close',
  Valid = 'valid',
}

const icons = {
  [Icons.ChevronLeft]: (
    <path d='M0.645583 5.70699L4.71399 9.77539C4.96195 10.0234 5.36398 10.0234 5.61195 9.77539C5.85991 9.52743 5.85991 9.12539 5.61195 8.87743L1.72856 4.99405L5.61194 1.11068C5.85943 0.863183 5.85812 0.461513 5.60901 0.215643C5.3622 -0.027966 4.96503 -0.0266684 4.71981 0.218548L0.645583 4.29277C0.255059 4.6833 0.255059 5.31646 0.645583 5.70699Z' />
  ),
  [Icons.ChevronRight]: (
    <path d='M5.35442 5.70699L1.28601 9.77539C1.03805 10.0234 0.636018 10.0234 0.388053 9.77539C0.140089 9.52743 0.14009 9.12539 0.388054 8.87743L4.27144 4.99405L0.388063 1.11068C0.14057 0.863183 0.141882 0.461513 0.390988 0.215643C0.637802 -0.027966 1.03497 -0.0266684 1.28019 0.218548L5.35442 4.29277C5.74494 4.6833 5.74494 5.31646 5.35442 5.70699Z' />
  ),
  [Icons.Sun]: (
    <>
      <path
        d='M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12 1V3'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12 21V23'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M4.22021 4.21997L5.64021 5.63997'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M18.3599 18.36L19.7799 19.78'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M1 12H3'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M21 12H23'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M4.22021 19.78L5.64021 18.36'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M18.3599 5.63997L19.7799 4.21997'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </>
  ),
  [Icons.Moon]: (
    <path
      d='M20.9999 12.79C20.8426 14.4922 20.2038 16.1144 19.1581 17.4668C18.1125 18.8192 16.7034 19.8458 15.0956 20.4265C13.4878 21.0073 11.7479 21.1181 10.0794 20.7461C8.41092 20.3741 6.8829 19.5345 5.67413 18.3258C4.46536 17.117 3.62584 15.589 3.25381 13.9205C2.88178 12.252 2.99262 10.5121 3.57336 8.9043C4.15411 7.29651 5.18073 5.88737 6.53311 4.84175C7.8855 3.79614 9.5077 3.15731 11.2099 3C10.2133 4.34827 9.73375 6.00945 9.85843 7.68141C9.98312 9.35338 10.7038 10.9251 11.8893 12.1106C13.0748 13.2961 14.6465 14.0168 16.3185 14.1415C17.9905 14.2662 19.6516 13.7866 20.9999 12.79Z'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  ),
  [Icons.Valid]: (
    <path
      d='M 33.226 79.713 c -0.418 0 -0.818 -0.175 -1.103 -0.482 L -0.103 44.308 c -0.562 -0.609 -0.523 -1.558 0.085 -2.12 c 0.609 -0.561 1.559 -0.523 2.12 0.085 l 31.07 33.669 l 54.679 -65.121 c 0.532 -0.634 1.479 -0.717 2.113 -0.185 c 0.634 0.533 0.717 1.479 0.184 2.113 L 34.375 79.178 c -0.277 0.33 -0.683 0.524 -1.114 0.535 C 33.249 79.713 33.237 79.713 33.226 79.713 z'
      transform=' matrix(1 0 0 1 0 0) '
      stroke-linecap='round'
    />
  ),
  [Icons.Close]: (
    <>
      <path
        d='M 3 90 c -0.768 0 -1.536 -0.293 -2.121 -0.879 c -1.172 -1.171 -1.172 -3.071 0 -4.242 l 84 -84 c 1.172 -1.172 3.07 -1.172 4.242 0 c 1.172 1.171 1.172 3.071 0 4.242 l -84 84 C 4.536 89.707 3.768 90 3 90 z'
        transform=' matrix(1 0 0 1 0 0) '
        stroke-linecap='round'
      />
      <path
        d='M 87 90 c -0.768 0 -1.535 -0.293 -2.121 -0.879 l -84 -84 c -1.172 -1.171 -1.172 -3.071 0 -4.242 c 1.171 -1.172 3.071 -1.172 4.242 0 l 84 84 c 1.172 1.171 1.172 3.071 0 4.242 C 88.535 89.707 87.768 90 87 90 z'
        transform=' matrix(1 0 0 1 0 0) '
        stroke-linecap='round'
      />
    </>
  ),
};

export const getIcon = (icon: Icons) => icons[icon];
