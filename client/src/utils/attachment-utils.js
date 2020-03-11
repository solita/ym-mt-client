import React from 'react';
import { filter } from 'ramda';

export const filterImageAttachments = filter(({ contentType }) => {
  const [fileType] = contentType.split('/');
  return fileType === 'image';
});

export const filterNonImageAttachments = filter(({ contentType }) => {
  const [fileType] = contentType.split('/');
  return fileType !== 'image';
});

export const nonImageAttachmentList = attachments => {
  const nonImageAttachments = filterNonImageAttachments(attachments);
  return nonImageAttachments.map(attachment => (
    <div key={attachment.id}>
      <a href={attachment.url} download target="_blank" rel="noopener noreferrer">
        {attachment.filename}
      </a>
    </div>
  ));
};

export const imageAttachmentList = (attachments, className) => {
  const imageAttachments = filterImageAttachments(attachments);
  return imageAttachments.map(attachment => (
    <div key={attachment.id} className={className}>
      <img src={attachment.url + '?preset=tnailmaxheight300'} alt={attachment.filename} />
    </div>
  ));
};
