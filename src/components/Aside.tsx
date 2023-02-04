import '../styled/Aside.scss'
import Projecte from './Projecte'

function Aside() {
  return (
    <div className='aside'>
      <div className=''>
        <div className='aside-select'>
          <div className='select-content'>
            <div className='select-title'>Название проекта</div>
            <div className='select-subtitle'>Аббревиатура</div>
          </div>
          <div className='select-arrow'></div>
        </div>
        <div className='aside-navigation'>
          <Projecte text='По проекту' link='/other' />
          <Projecte text='Объекты' link='/other' />
          <Projecte text='РД' link='/other' />
          <Projecte text='МТО' link='/qwert' />
          <Projecte text='СМР' link='/' />
          <Projecte text='График' link='/other' />
          <Projecte text='МиМ' link='/other' />
          <Projecte text='Рабочие' link='/other' />
          <Projecte text='Капвложения' link='/other' />
          <Projecte text='Бюджет' link='/other' />
          <Projecte text='Финансирование' link='/other' />
          <Projecte text='Панорамы' link='/other' />
          <Projecte text='Камеры' link='/other' />
          <Projecte text='Поручения' link='/other' />
          <Projecte text='Контрагенты' link='/other' />
        </div>
      </div>
    </div>
  )
}

export default Aside
