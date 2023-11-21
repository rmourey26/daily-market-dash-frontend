import Header from '../Header';
import StaticBottomNavigation from './StaticBottomNavigation';

const MyMoneyScreen = () => {
  return (
    <div className='main-loader'>
      <Header />
      <div className='brk-top-section portfolio-section port-two'>
        <h5>PORTFOLIO</h5>
        <h4>
          become the matador
          <br />
          [aka star bullfighter]
        </h4>
        <img src='assets/images/icons/gray_arrow_left.svg' alt='' />
      </div>
      <div className='market-section'>
        <div className='row'>
          <div className='book'>
            <div className='card'>
              <div className='one'>
                <img src='assets/images/icons/book.svg' alt='' />
              </div>
              <div className='two'>
                <h4>book</h4>
                <h5>$10,000.00</h5>
              </div>
            </div>
          </div>
          <div className='roi'>
            <div className='card'>
              <div className='one'>
                <img src='assets/images/icons/roi.svg' alt='' />
              </div>
              <div className='two'>
                <h4>roi</h4>
                <h5>$2,938.00</h5>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='market'>
            <div className='card'>
              <div className='one'>
                <img src='assets/images/icons/market.svg' alt='' />
              </div>
              <div className='two'>
                <h4>market</h4>
                <h5>$29,397.00</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='market-table-section'>
        <div className='row head'>
          <div className='col-2'>
            <h4>sym</h4>
          </div>
          <div className='col-2'>
            <h4>exc</h4>
          </div>
          <div className='col-2'>
            <h4>cur</h4>
          </div>
          <div className='col-2'>
            <h4>q</h4>
          </div>
          <div className='col-2'>
            <h4>book</h4>
          </div>
          <div className='col-2'>
            <h4>market</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <h4 className='green'>appl</h4>
          </div>
          <div className='col-2'>
            <h4>nas</h4>
          </div>
          <div className='col-2'>
            <h4>usd</h4>
          </div>
          <div className='col-2'>
            <h4>100</h4>
          </div>
          <div className='col-2'>
            <h4>$10,000.00</h4>
          </div>
          <div className='col-2'>
            <h4 className='green normal'>$1,245.67</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <h4 className='green'>nik</h4>
          </div>
          <div className='col-2'>
            <h4>nas</h4>
          </div>
          <div className='col-2'>
            <h4>usd</h4>
          </div>
          <div className='col-2'>
            <h4>50</h4>
          </div>
          <div className='col-2'>
            <h4>$12,550.00</h4>
          </div>
          <div className='col-2'>
            <h4 className='red normal'>$4,567.00</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <h4 className='green'>abs</h4>
          </div>
          <div className='col-2'>
            <h4>nas</h4>
          </div>
          <div className='col-2'>
            <h4>usd</h4>
          </div>
          <div className='col-2'>
            <h4>20</h4>
          </div>
          <div className='col-2'>
            <h4>$14,300.00</h4>
          </div>
          <div className='col-2'>
            <h4 className='green normal'>$9,065.12</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <h4 className='green'>wal</h4>
          </div>
          <div className='col-2'>
            <h4>nas</h4>
          </div>
          <div className='col-2'>
            <h4>usd</h4>
          </div>
          <div className='col-2'>
            <h4>80</h4>
          </div>
          <div className='col-2'>
            <h4>$17,500.00</h4>
          </div>
          <div className='col-2'>
            <h4 className='red normal'>$1,200.55</h4>
          </div>
        </div>
      </div>
      <StaticBottomNavigation />
    </div>
  );
};

export default MyMoneyScreen;
