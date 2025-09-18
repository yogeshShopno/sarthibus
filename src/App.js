import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import BusList from './pages/busList';
import PassengerDetails from './pages/passanger';
import TicketConfirmation from './pages/confim_ticket';
import ProfileDetails from './pages/profile';
import RegisterDetail from './pages/register';
// import LoginDetail from './pages/login';
import ForgotPasswordDetail from './pages/forgot-password';
import AboutUs from './pages/aboutUs';
import PassengerView from './pages/passangerView';
import ContactUs from './pages/contact';
import TicketsDetailsView from './pages/tickets-details';
import BlogPage from './pages/blog-page';
import SingleBlog from './pages/singleBlog';
import PreviousBooking from './components/profile/previosbooking';
import CancelTicket from './components/profile/cancel-ticket';
import ShowMyTicket from './components/profile/show-my-ticket';
import ShippingPolicy from './components/profile/shipping-policy';
import TermsConditions from './components/profile/terms-and-conditions';
import CancelPolicy from './components/profile/cancel-policy';
import PrivacyPolicy from './components/profile/privacy-policy';
import Faq from './components/profile/faq';
import Wallet from './components/profile/wallet';
import SuccessTicket from './pages/success-ticket';
import PaymentStatus from './pages/paymentStatus';
import SeatLayout2 from './pages/seatLayout2';
import SeatLayout1 from './pages/seatLayout1';




function App() {

  function usePageTitle(title) {
    useEffect(() => {
      document.title = title;
    }, [title]);
  }


  function TitleRoute({ title, children, ...rest }) {
    usePageTitle(title);
    return <Route {...rest}>{children}</Route>;
  }

  return (
    <>


      <Router>
        <Switch>
          <TitleRoute exact path='/' title="Sarthi Bus - sarthibus.com">
            <Home />
          </TitleRoute >
          <TitleRoute exact path="/seat-layout2" title="Sarthi Bus - sarthibus.com">
            <SeatLayout1 />
          </TitleRoute>

          <TitleRoute exact path="/seat-layout2" title="Sarthi Bus - sarthibus.com">
            <SeatLayout2 />
          </TitleRoute>
          <TitleRoute path='/bus-list' title="Bus List - sarthibus.com" >
            <BusList />
          </TitleRoute>
          <TitleRoute path='/passange-details' title="Passenger Details - sarthibus.com">
            <PassengerDetails />
          </TitleRoute>
          <TitleRoute path='/ticket-view' title="Ticket Confirmation - sarthibus.com">
            <TicketConfirmation />
          </TitleRoute>

          <TitleRoute path="/profile" component={ProfileDetails} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/edit-profile" component={ProfileDetails} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/support" component={ProfileDetails} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/wallet" component={Wallet} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/previous-booking" component={ProfileDetails} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/cancel-ticket" component={ProfileDetails} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/show-my-ticket" component={ProfileDetails} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/shipping-delivery" component={ProfileDetails} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/terms-conditions" component={ProfileDetails} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/cancel-refund-policy" component={ProfileDetails} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/privacy-policy" component={ProfileDetails} title="Profile - sarthibus.com" />
          <TitleRoute path="/profile/faq" component={ProfileDetails} title="Profile - sarthibus.com" />
          {/* <TitleRoute path='/sign-up' title="Register - sarthibus.com">
            <RegisterDetail />
          </TitleRoute> */}
          {/* <TitleRoute path='/login' title="Login - sarthibus.com">
            <LoginDetail />
          </TitleRoute> */}
          {/* <TitleRoute path='/forgot-password' title="Reset Pasword - sarthibus.com">
            <ForgotPasswordDetail />
          </TitleRoute> */}
          <TitleRoute path='/about-us' title="About - sarthibus.com">
            <AboutUs />
          </TitleRoute >
          <TitleRoute path='/passenger-detail-view' title="Passenger View - sarthibus.com">
            <PassengerView />
          </TitleRoute>
          <TitleRoute path='/payment-status' title="payment-status - sarthibus.com">
            <PaymentStatus />
          </TitleRoute>

          <TitleRoute path='/contact-us' title="Conact Us - sarthibus.com">
            <ContactUs />
          </TitleRoute>
          <TitleRoute path='/ticket-details-view/:type/:id' title="Ticket Details - sarthibus.com">
            <TicketsDetailsView />
          </TitleRoute>
          <TitleRoute path='/blog-details' title="Blog Details - sarthibus.com">
            <BlogPage />
          </TitleRoute>
          <TitleRoute path='/single-blog/:id' title="Single Blog - sarthibus.com">
            <SingleBlog />
          </TitleRoute>
          <TitleRoute path='/success-ticket' title="Success Ticket - sarthibus.com">
            <SuccessTicket />
          </TitleRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
