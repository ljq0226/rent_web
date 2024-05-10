'use client';

// Types
// import CalendarInput from '../inputs/CalendarInput';

const ListingReservation = ({
  dateRange,
  disabledDates,
  disabled,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
}: any) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <p className="text-2xl font-semibold ">$ {price}</p>
        <p className="font-light text-neutral-600 "> /night</p>
      </div>
      <hr />
      {/* <CalendarInput
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      /> */}
      <hr />
      <div className="p-4">
        <button onClick={onSubmit} disabled={disabled} />
      </div>
      <hr />
      <div className="flex flex-row items-center justify-between p-4">
        <p>Total:</p>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
