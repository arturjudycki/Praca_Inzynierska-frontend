import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { userAuth } from "../API-utils/endpointsAuthUser";
import {
  addComment,
  getComments,
  editComment,
  deleteComment,
} from "../API-utils/endpointsManageComments";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";
import $ from "jquery";

const LoginSchemat = Yup.object().shape({
  content_comment: Yup.string().required("Komentarz nie może być pusty!"),
});

const Comments = ({ info }) => {
  const idText = info.id_text;
  const queryClient = useQueryClient();

  let displayComments;

  const { status: isComments, data: comments } = useQuery(
    ["comments-data", idText],
    () => getComments(idText),
    {
      retry: 0,
    }
  );

  if (isComments === "success") {
    displayComments = comments
      .sort((a, b) => b.id_comment - a.id_comment)
      .map((comment) => (
        <div key={comment.id_comment} className="comment__box">
          <p className="comment__box-item">{comment.content_comment}</p>
          <p className="comment__box-item">{comment.publication_date}</p>
          <p className="comment__box-item">{comment.username}</p>
        </div>
      ));
  }

  const { mutate: add_comment } = useMutation(addComment, {
    onSuccess: (newComment) => {
      queryClient.invalidateQueries(["comments-data"]);
    },
  });

  // const {
  //   isError: errorEdit,
  //   isSuccess: successEdit,
  //   mutate: edit_comment,
  // } = useMutation(editComment, {});

  // const {
  //   isError: errorDelete,
  //   isSuccess: successDelete,
  //   mutate: delete_comment,
  // } = useMutation(deleteComment, {});

  return (
    <>
      <p className="comment-title" id="commentTitle">
        Komentarze{" "}
        <span>
          {comments !== undefined && comments.length !== 0
            ? `(${comments.length})`
            : ""}
        </span>
      </p>
      <section className="comments">
        <Formik
          initialValues={{
            content_comment: "",
            id_text: idText,
          }}
          validationSchema={LoginSchemat}
          onSubmit={(values, onSubmitProps) => {
            add_comment(values);
            onSubmitProps.resetForm();
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="comments__form">
              <div className="comments__addContainer">
                <Field
                  as="textarea"
                  id="content_comment"
                  name="content_comment"
                  placeholder="Dodaj komentarz"
                  className="comments__form-input"
                />
                <button type="submit" className="button-addComment">
                  skomentuj
                </button>
              </div>
              <div className="errors">
                <ErrorMessage name="content_comment" />
              </div>
            </Form>
          )}
        </Formik>
      </section>
      <section className="display-comments">{displayComments}</section>
    </>
  );
};

export default Comments;
