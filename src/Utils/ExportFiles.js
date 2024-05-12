export const ExportFeature = (hreflink) => {
  let alink = document.createElement("a");
  alink.href = hreflink;
  alink.download = "SamplePDF.pdf";
  alink.click();
};
