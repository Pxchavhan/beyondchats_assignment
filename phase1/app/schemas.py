from pydantic import BaseModel

class ArticleBase(BaseModel):
    title: str
    url: str

class ArticleCreate(ArticleBase):
    pass

class ArticleResponse(ArticleBase):
    id: int

    model_config = {
        "from_attributes": True
    }
