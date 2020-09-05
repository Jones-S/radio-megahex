const formatsMap = {
  ajourmagazin: 'Ajour Magazin',
  antipolizei: 'Anti Polizei News',
  antira: 'Antira Wochenschau',
  bunkr: 'Bunkr Extracts',
  burnoutdream: 'Burn Out Dream',
  gecko: 'Channel Gecko',
  czarnagora: 'Czarnagora',
  morningshow: 'Megahex Morgenshow',
  misc: 'Misc'
}

/*
 * Kirby exports select fields only as values and not as text. So we need to save that value...
 */
export function mapFormats(data) {
  return data.map(format => {
    return {
      slug: format,
      name: formatsMap[format]
    }
  })
}
