import React, { useState, useEffect } from 'react';

function TagifyComponent({ liClassName, aClassName, listTag, onSelected, isFilter, listActive, ...props }) {
  let [selected, setSelected] = useState([]);
  const [activeLi, setActiceLi] = useState({
    name: '',
    isDetail: 0
  });
  const operationTags = (tag, multi, isUrl) => {
    activeLi.name = tag.name;
    activeLi.isDetail = isUrl;
    setActiceLi({ ...activeLi });
    if (selected.some((x) => x == tag?.name)) {
      const index = selected.findIndex((x) => x === tag?.name);
      if (index !== -1) {
        selected.splice(index, 1);
      }
    } else {
      if (multi) {
        selected.push(tag?.name);
      } else {
        selected = [tag?.name];
      }
    }
    setSelected([...selected]);
  };

  const isActive = (tagName) => {
    var checkTag = selected?.find((x) => x === tagName) !== undefined;
    return checkTag;
  };

  useEffect(() => {
    if (listActive) {
      operationTags(listActive, isFilter, 1);
    }
  },[]);

  useEffect(() => {
    if (onSelected) onSelected(selected);
  }, [selected]);

  return (
    <>
      {(() => {
        if (activeLi.name && activeLi.isDetail == 1) {
          return (
            <li
              className={`${liClassName} custom-tag active`}
              onClick={() => {
                operationTags({ activeLi }, isFilter, 0);
              }}
            >
              <a role="button" className={`${aClassName} custom-tag active`} id={`active_tag`}>
                <p> {activeLi?.name}</p>
              </a>
            </li>
          );
        }
      })()}
      {(() => {
        if (activeLi.isDetail == 1) {
          return (
            <>
              {
                listTag?.filter(x => x.name != (activeLi.name ? activeLi.name : "")).map((item, index) => {
                  return (
                    <li
                      className={isActive(item?.name) ? `${liClassName} custom-tag active` : liClassName}
                      key={`li_tag_${index}`}
                      onClick={() => {
                        operationTags(item, isFilter, 0);
                      }}
                    >
                      <a
                        role="button"
                        className={isActive(item?.name) ? `${aClassName} custom-tag active` : aClassName}
                        id={isActive(item?.name) ? `active_tag` : aClassName}
                        key={`a_tag_${index}`}
                      >
                        <p> {item?.name}</p>
                      </a>
                    </li>
                  );
                })}
            </>
          );
        } else {
          return (
            <>
              {
                listTag?.filter(x => x.name && x.name !== "")?.map((item, index) => {
                  return (
                    <li
                      className={isActive(item?.name) ? `${liClassName} custom-tag active` : liClassName}
                      key={`li_tag_${index}`}
                      onClick={() => {
                        operationTags(item, isFilter, 0);
                      }}
                    >
                      <a
                        role="button"
                        className={isActive(item?.name) ? `${aClassName} custom-tag active` : aClassName}
                        id={isActive(item?.name) ? `active_tag` : aClassName}
                        key={`a_tag_${index}`}
                      >
                        <p> {item?.name}</p>
                      </a>
                    </li>
                  );
                })}
            </>
          )
        }
      })()}

    </>
  );
}

TagifyComponent.propTypes = {};

export default TagifyComponent;
