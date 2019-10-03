import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useStateValue } from '../reducer/state';
import { fullSearchByKeys, filterKeyByValues } from '../utilities';
import { DELETE_URL, REORDER_URLS } from '../reducer';

export default function UrlsPage() {
  const [{ urls }, dispatch] = useStateValue();
  const [searchPhrase, setSearchPhrase] = useState('');
  const [getFilter, setGetFilter] = useState(false);
  const [postFilter, setPostFilter] = useState(false);
  const [putFilter, setPutFilter] = useState(false);
  const [deleteFilter, setDeleteFilter] = useState(false);
  const filteredUrls = useMemo(
    () => {
      let newUrls = fullSearchByKeys(urls, ['route', 'method'], searchPhrase);

      if (newUrls.length > 0) {
        const selectedMethods = [
          getFilter ? 'get' : null,
          postFilter ? 'post' : null,
          putFilter ? 'put' : null,
          deleteFilter ? 'delete' : null,
        ].filter((v) => !!v);

        if (selectedMethods.length > 0) {
          newUrls = filterKeyByValues(newUrls, 'method', selectedMethods);
        }
      }

      return newUrls;
    },
    [urls, searchPhrase, getFilter, postFilter, putFilter, deleteFilter],
  );
  const resetClick = useCallback(() => {
    setSearchPhrase('');
    setGetFilter(false);
    setPostFilter(false);
    setPutFilter(false);
    setDeleteFilter(false);
  }, []);

  return (
    <div className="container-lg px-3 py-5">
      <div className="col-12 px-3">
        <div className="d-flex flex-items-center">
          <h3 className="flex-auto">URLs</h3>
          <Link to="/urls/create" className="link-gray">
            <i className="fas fa-plus" />
          </Link>
        </div>
        <hr />
        <div className="d-flex flex-items-center mb-3">
          <input className="form-control flex-auto" type="text" placeholder="Find a URL..." value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} />
          <div className="subnav m-0 ml-3">
            <nav className="subnav-links">
              <button type="button" className={classnames('subnav-item', { selected: getFilter })} onClick={() => setGetFilter((value) => !value)}>GET</button>
              <button type="button" className={classnames('subnav-item', { selected: postFilter })} onClick={() => setPostFilter((value) => !value)}>POST</button>
              <button type="button" className={classnames('subnav-item', { selected: putFilter })} onClick={() => setPutFilter((value) => !value)}>PUT</button>
              <button type="button" className={classnames('subnav-item', { selected: deleteFilter })} onClick={() => setDeleteFilter((value) => !value)}>DELETE</button>
            </nav>
          </div>
          <button type="button" className="btn-link ml-3" onClick={resetClick}>Reset</button>
        </div>
        <div className="Box Box--condensed">
          <div className="Box-header Box-header--gray d-flex flex-items-center">
            <i className="fas fa-bars mr-3 v-hidden" />
            <div className="col-6"><strong>Route</strong></div>
            <div className="col-6"><strong>Method</strong></div>
            <span className="btn-link v-hidden">
              <i className="fas fa-trash-alt fa-fw" />
            </span>
            <span className="btn-link v-hidden ml-3">
              <i className="fas fa-trash-alt fa-fw" />
            </span>
          </div>
          <DragDropContext onDragEnd={({ source: { index: from }, destination: { index: to } }) => {
            dispatch({ type: REORDER_URLS, value: { from, to } });
          }}
          >
            <Droppable droppableId="urlsDroppable">
              { (provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  { filteredUrls.map((url, index) => (
                    <Draggable key={url.id} draggableId={url.id} index={index}>
                      { (innerProvided, innerSnapshot) => (
                        <div key={url.id} className={classnames('Box-row d-flex flex-items-center text-mono', { 'border-0': innerSnapshot.isDragging, 'bg-gray': innerSnapshot.isDragging })} ref={innerProvided.innerRef} {...innerProvided.draggableProps} {...innerProvided.dragHandleProps} style={innerProvided.draggableProps.style}>
                          <i className="fas fa-bars mr-3" />
                          <div className="col-6">
                            <Link to={`/urls/${url.id}`}>
                              {url.route}
                            </Link>
                          </div>
                          <div className="col-6">{url.method}</div>
                          <div className="d-flex">
                            <button type="button" className="link-gray btn-link ml-3" onClick={() => dispatch({ type: DELETE_URL, id: url.id })}>
                              <i className="fas fa-trash-alt fa-fw" />
                            </button>
                          </div>
                        </div>
                      ) }
                    </Draggable>
                  )) }
                  { provided.placeholder }
                </div>
              ) }
            </Droppable>
          </DragDropContext>
          { filteredUrls.length === 0 && (
          <div className="Box-row d-flex flex-items-center text-mono">
            <i className="fas fa-bars mr-3 v-hidden" />
            <div>No results</div>
          </div>
          ) }
        </div>
      </div>
    </div>
  );
}
