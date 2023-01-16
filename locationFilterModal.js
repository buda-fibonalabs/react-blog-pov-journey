import { message, Modal, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { DEFAULT_CITY } from "../../constants/Common";
import callApi from "../../services/networkUtils/networkUtils.index";
import FilterPin from "../ESCommonFilterPin";
const { Option } = Select;
/*
Location filter is AbstractedContainer which only requires the handleSubmit
*/

function LocationFilterModal({ handleSubmit }) {
  const [loading, setLoading] = useState(false);
  const [showCity, setShowCity] = useState(DEFAULT_CITY);
  const [visible, setVisible] = useState(false);
  const [cityModalState, setCityModalState] = useState(DEFAULT_CITY);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    const listCity = async () => {
      try {
        setLoading(true);
        let listCityRes = await callApi("some/api/endpoint");
        if (listCityRes && listCityRes.status === "Success") {
          setLoading(false);
          setCityList([DEFAULT_CITY, ...listCityRes.data]);
        }
      } catch (error) {
        setLoading(false);
        message.error(error ?? "failed to get fos list");
      }
    };
    listCity();
    return () => ac.abort();
  }, []);

  const onOkModal = () => {
    handleSubmit(cityModalState);
    setShowCity(cityModalState);
    setVisible(false);
  };

  return (
    <>
      <FilterPin
        showText={`${showCity}`}
        filterName={"Location"}
        onClick={() => setVisible((prev) => !prev)}
      />

      <Modal
        title={<div className="modal-header-product">Filter by location</div>}
        visible={visible}
        onCancel={() => setVisible((prev) => !prev)}
        onOk={onOkModal}
      >
        <div className="filter-select-label">CITY</div>
        {loading ? (
          <Spin />
        ) : (
          <Select value={cityModalState} onChange={(v) => setCityModalState(v)}>
            {cityList &&
              cityList.length > 0 &&
              cityList.map((city, i) => {
                return (
                  <Option value={city} key={i}>
                    {city}
                  </Option>
                );
              })}
          </Select>
        )}
      </Modal>
    </>
  );
}

export default LocationFilterModal;
