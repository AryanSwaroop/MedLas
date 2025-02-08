import os
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.exceptions import OutputParserException
from dotenv import load_dotenv

load_dotenv()

class Chain:
    def __init__(self):
        self.llm = ChatGroq(temperature=0, groq_api_key=os.getenv("GROQ_API_KEY"), model_name="llama-3.3-70b-versatile")

    def extract_link(self, cleaned_text):
        prompt_extract = PromptTemplate.from_template(
            """
            ### SCRAPED TEXT FROM WEBSITE:
            {page_data}
            ### INSTRUCTION:
            The scraped text is from the clinics's page of a doctors website.
            Your job is to extract the data from their website postings and return them in JSON format containing the following keys: `concerns`, `treatment` and `treatment duration`.
            Only return the valid JSON.
            ### VALID JSON (NO PREAMBLE):
            """
        )

        """ Here we combine the prompt and llm """        
        chain_extract = prompt_extract | self.llm 

        res = chain_extract.invoke(input={"page_data": cleaned_text})
        
        try:
            json_parser = JsonOutputParser()
            res = json_parser.parse(res.content)
        except OutputParserException:
            raise OutputParserException("Context too big. Unable to parse treatment.")
        return res if isinstance(res, list) else [res]

    def write_reply(self, query, links):
        prompt_reply = PromptTemplate.from_template(
            """
            ### JOB DESCRIPTION:
            {query}

            ### INSTRUCTION:
            You are MedLas, a AI medical councellor in a Gaynaa clinic. Gaynaa is a clinic dealing with various medical treatments. 
            in fulfilling their needs.
            also add some more relevant data for user query : {query}
            Remember you are MedLas, AI medical councellor. keep message in 200 words.
            Also add the most relevant one from the following links at the end of message to showcase Gaynaa's treatments: {link_list}
            Do not provide a preamble.
            ### Reply (NO PREAMBLE):

            """
        )
        chain_email = prompt_reply | self.llm
        res = chain_email.invoke({"query": str(query), "link_list": links})
        return res.content
if __name__ == "__main__":
    print(os.getenv("GROQ_API_KEY"))