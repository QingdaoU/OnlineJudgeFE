import i18n from '@/i18n'

function getItemColor (obj) {
  var pieColorMap = new Map()
  pieColorMap.set(i18n.t('m.Short_Accepted'), '#19be6b')
  pieColorMap.set(i18n.t('m.Short_Wrong_Answer'), '#ed3f14')
  pieColorMap.set(i18n.t('m.Short_Time_Limit_Exceeded'), '#ff9300')
  pieColorMap.set(i18n.t('m.Short_Memory_Limit_Exceeded'), '#f7de00')
  pieColorMap.set(i18n.t('m.Short_Runtime_Error'), '#ff6104')
  pieColorMap.set(i18n.t('m.Short_Compile_Error'), '#80848f')
  pieColorMap.set(i18n.t('m.Short_Partial_Accepted'), '#2d8cf0')
  return pieColorMap.get(obj.name)
}

const pie = {
  legend: {
    left: 'center',
    top: '10',
    orient: 'horizontal',
    data: [i18n.t('m.Short_Accepted'), i18n.t('m.Short_Wrong_Answer')]
  },
  series: [
    {
      name: 'Summary',
      type: 'pie',
      radius: '80%',
      center: ['50%', '55%'],
      itemStyle: {
        normal: {color: getItemColor}
      },
      data: [
        {value: 0, name: i18n.t('m.Short_Wrong_Answer')},
        {value: 0, name: i18n.t('m.Short_Accepted')}
      ],
      label: {
        normal: {
          position: 'inner',
          show: true,
          formatter: '{b}: {c}\n {d}%',
          textStyle: {
            fontWeight: 'bold'
          }
        }
      }
    }
  ]
}

const largePie = {
  legend: {
    left: 'center',
    top:
      '10',
    orient:
      'horizontal',
    itemGap:
      20,
    data:
      [i18n.t('m.Short_Accepted'), i18n.t('m.Short_Runtime_Error'), i18n.t('m.Short_Wrong_Answer'), i18n.t('m.Short_Time_Limit_Exceeded'), i18n.t('m.Short_Partial_Accepted'), i18n.t('m.Short_Memory_Limit_Exceeded')]
  },
  series: [
    {
      name: 'Detail',
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '55%'],
      itemStyle: {
        normal: {color: getItemColor}
      },
      data: [
        {value: 0, name: i18n.t('m.Short_Runtime_Error')},
        {value: 0, name: i18n.t('m.Short_Wrong_Answer')},
        {value: 0, name: i18n.t('m.Short_Time_Limit_Exceeded')},
        {value: 0, name: i18n.t('m.Short_Accepted')},
        {value: 0, name: i18n.t('m.Short_Memory_Limit_Exceeded')},
        {value: 0, name: i18n.t('m.Short_Partial_Accepted')}
      ],
      label: {
        normal: {
          formatter: '{b}: {c}\n {d}%'
        }
      },
      labelLine: {
        normal: {}
      }
    },
    {
      name: 'Summary',
      type: 'pie',
      radius: '30%',
      center: ['50%', '55%'],
      itemStyle: {
        normal: {color: getItemColor}
      },
      data: [
        {value: 0, name: i18n.t('m.Short_Wrong_Answer')},
        {value: 0, name: i18n.t('m.Short_Accepted'), selected: true}
      ],
      label: {
        normal: {
          position: 'inner',
          formatter: '{b}: {c}\n {d}%'
        }
      }
    }
  ]
}

export { pie, largePie }
