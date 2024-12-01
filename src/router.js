import { Route, Routes } from "react-router-dom";
import Home from "pages/home/Home";
import AuditoriumHome from "pages/auditorium/AuditoriumHome";
import ScheduleHome from "pages/schedule/ScheduleHome";
import SeatHome from "pages/seat/Seat";
import PaymentsHome from "pages/payments/PaymentsHome";

const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/auditorium"}>
        <Route path={"home"} element={<AuditoriumHome />}>
          <Route path={"*"} element={<AuditoriumHome />} />
        </Route>
      </Route>
      <Route path={"/schedule"}>
        <Route path={"home"} element={<ScheduleHome />}>
          <Route path={"*"} element={<ScheduleHome />} />
        </Route>
      </Route>
      <Route path={"/seat"}>
        <Route path={"home"} element={<SeatHome />}>
          <Route path={"*"} element={<SeatHome />} />
        </Route>
      </Route>
      <Route path={"/payments"}>
        <Route path={"home"} element={<PaymentsHome />}>
          <Route path={"*"} element={<PaymentsHome />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
